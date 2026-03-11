// Pines analógicos para monitorear cada LED
const int PIN_LED_ROJO = A1;   // Conectado al cátodo del LED rojo (vía resistencia 1kΩ)
const int PIN_LED_VERDE = A2;  // Conectado al cátodo del LED verde

int valorRojo = 0;
int valorVerde = 0;
unsigned long lastSend = 0;
const unsigned long INTERVALO = 100;  // ms entre lecturas

void setup() {
  Serial.begin(9600);
}

void loop() {
  if (millis() - lastSend >= INTERVALO) {
    lastSend = millis();
    
    // Leer el estado de cada LED
    valorRojo = analogRead(PIN_LED_ROJO);
    valorVerde = analogRead(PIN_LED_VERDE);
    
    // Enviar ambos valores en formato "ROJO:valor,VERDE:valor"
    Serial.print("ROJO:");
    Serial.print(valorRojo);
    Serial.print(",VERDE:");
    Serial.println(valorVerde);
  }
}
