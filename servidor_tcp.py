ultimo_rojo = 0
ultimo_verde = 0
lock = threading.Lock()

def leer_serial(ser):
    global ultimo_rojo, ultimo_verde
    while True:
        try:
            linea = ser.readline().decode('utf-8', errors='ignore').strip()
            if linea.startswith("ROJO:") and ",VERDE:" in linea:
                partes = linea.split(",")
                rojo_parte = partes[0]
                verde_parte = partes[1]
                
                with lock:
                    ultimo_rojo = int(rojo_parte[5:])
                    ultimo_verde = int(verde_parte[6:])
        except Exception as e:
            print(f"Error: {e}")
            time.sleep(0.1)

# En el comando GET_STATE:
if cmd == "GET_STATE":
    with lock:
        respuesta = f"ROJO:{ultimo_rojo},VERDE:{ultimo_verde}"
    conn.sendall((respuesta + "\n").encode("utf-8"))
    continue
