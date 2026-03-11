@app.get("/api/estado")
def get_estado():
    if not is_logged_in():
        return jsonify({"ok": False, "error": "No autorizado"}), 401
    
    resp = send_cmd("GET_STATE")
    
    try:
        partes = resp.split(",")
        rojo = int(partes[0].split(":")[1])
        verde = int(partes[1].split(":")[1])
        return jsonify({
            "ok": True,
            "rojo": rojo,
            "verde": verde
        })
    except:
        return jsonify({"ok": False, "error": resp})
