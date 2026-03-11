from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from werkzeug.security import check_password_hash
import socket

# --- CONFIGURACIÓN DE AUTENTICACIÓN (cambia estos valores) ---
APP_USER = "admin"   # Usuario
APP_PW_HASH = "scrypt:32768:8:1$Z2Z2sdfSDf...$..."   # Reemplaza con hash real de tu contraseña
SECRET_KEY = "clave-secreta-muy-larga-y-aleatoria"
# ------------------------------------------------------------

TCP_HOST = "127.0.0.1"
TCP_PORT = 5001

app = Flask(__name__)
app.secret_key = SECRET_KEY

def is_logged_in():
    return session.get("logged_in") is True

def send_cmd(cmd: str) -> str:
    """Envía un comando TCP y devuelve la respuesta."""
    try:
        with socket.create_connection((TCP_HOST, TCP_PORT), timeout=2) as s:
            s.sendall((cmd + "\n").encode("utf-8"))
            return s.recv(1024).decode("utf-8", errors="ignore").strip()
    except Exception as e:
        return f"ERR:{str(e)}"

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        user = request.form.get("username", "").strip()
        pw = request.form.get("password", "")
        if user == APP_USER and check_password_hash(APP_PW_HASH, pw):
            session["logged_in"] = True
            return redirect(url_for("index"))
        return render_template("login.html", error="Usuario o contraseña incorrectos")
    return render_template("login.html", error=None)

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

@app.route("/")
def index():
    if not is_logged_in():
        return redirect(url_for("login"))
    return render_template("index.html")

@app.post("/set_led")
def set_led():
    if not is_logged_in():
        return jsonify({"ok": False, "error": "No autorizado"}), 401

    data = request.get_json(silent=True) or {}
    led = data.get("led")      # "rojo" o "verde"
    action = data.get("action") # "on" o "off"

    if led not in ("rojo", "verde"):
        return jsonify({"ok": False, "error": "LED no válido"}), 400

    if action not in ("on", "off"):
        return jsonify({"ok": False, "error": "Acción no válida"}), 400

    cmd = f"{led.upper()}_{action.upper()}"   # Ej: "ROJO_ON"
    resp = send_cmd(cmd)
    ok = resp.startswith("OK")
    return jsonify({"ok": ok, "cmd": cmd, "resp": resp})

@app.get("/api/ldr")
def get_ldr():
    if not is_logged_in():
        return jsonify({"ok": False, "error": "No autorizado"}), 401
    resp = send_cmd("GET_LDR")
    # Se espera "LDR:valor"
    if resp.startswith("LDR:"):
        try:
            valor = int(resp[4:])
            return jsonify({"ok": True, "valor": valor})
        except:
            return jsonify({"ok": False, "error": "Valor inválido"})
    else:
        return jsonify({"ok": False, "error": resp})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
