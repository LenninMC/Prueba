import socket
import serial
import threading
import time

# --- CONFIGURACIÓN ---
SERIAL_PORT = "/dev/ttyACM0"   # Ajusta según tu sistema (ej. COM3 en Windows)
BAUDRATE    = 9600
HOST = "0.0.0.0"
PORT = 5001
# ----------------------

# Comandos válidos (opcional, si se quiere controlar los LEDs digitalmente)
VALID_CMDS = {"RED_ON", "RED_OFF", "GREEN_ON", "GREEN_OFF"}

ultimo_rojo = 0
ultimo_verde = 0
lock = threading.Lock()

def leer_serial(ser):
    """Hilo que lee continuamente del serial y actualiza los últimos valores."""
    global ultimo_rojo, ultimo_verde
    while True:
        try:
            linea = ser.readline().decode('utf-8', errors='ignore').strip()
            # Formato esperado: "ROJO:512,VERDE:512"
            if linea.startswith("ROJO:") and ",VERDE:" in linea:
                partes = linea.split(",")
                rojo_parte = partes[0]  # "ROJO:512"
                verde_parte = partes[1]  # "VERDE:512"
                
                with lock:
                    ultimo_rojo = int(rojo_parte[5:])
                    ultimo_verde = int(verde_parte[6:])
                # print(f"Rojo: {ultimo_rojo}, Verde: {ultimo_verde}")  # Debug
        except Exception as e:
            print(f"Error en lectura serial: {e}")
            time.sleep(0.1)

def main():
    global ultimo_rojo, ultimo_verde
    try:
        ser = serial.Serial(SERIAL_PORT, BAUDRATE, timeout=0.5)
        print(f"Conectado a Arduino en {SERIAL_PORT} a {BAUDRATE} baudios")
    except Exception as e:
        print(f"Error al abrir puerto serie: {e}")
        return

    # Iniciar hilo de lectura serial
    hilo = threading.Thread(target=leer_serial, args=(ser,), daemon=True)
    hilo.start()

    # Crear socket TCP
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((HOST, PORT))
        s.listen(5)
        print(f"Servidor TCP escuchando en {HOST}:{PORT}...")

        while True:
            conn, addr = s.accept()
            with conn:
                print(f"Conexión desde {addr}")
                data = conn.recv(1024)
                if not data:
                    continue

                cmd = data.decode("utf-8", errors="ignore").strip().upper()

                if cmd == "GET_STATE":
                    with lock:
                        respuesta = f"ROJO:{ultimo_rojo},VERDE:{ultimo_verde}"
                    conn.sendall((respuesta + "\n").encode("utf-8"))
                    continue

                if cmd not in VALID_CMDS:
                    conn.sendall(b"ERR:CMD\n")
                    continue

                # Enviar comando a Arduino (si se implementa control)
                ser.write((cmd + "\n").encode("utf-8"))
                ser.flush()

                # Esperar respuesta
                resp = ser.readline().decode("utf-8", errors="ignore").strip()
                if not resp:
                    resp = "ERR:TIMEOUT"

                conn.sendall((resp + "\n").encode("utf-8"))

if __name__ == "__main__":
    main()
