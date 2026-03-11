const int PIN_LED_ROJO = A1;   // Mide voltaje en LED rojo
const int PIN_LED_VERDE = A2;  // Mide voltaje en LED verde

int valorRojo = 0;
int valorVerde = 0;
unsigned long lastSend = 0;
const unsigned long INTERVALO = 100;

void setup() {
  Serial.begin(9600);
}

void loop() {
  if (millis() - lastSend >= INTERVALO) {
    lastSend = millis();
    
    valorRojo = analogRead(PIN_LED_ROJO);
    valorVerde = analogRead(PIN_LED_VERDE);
    
    // Enviar ambos valores
    Serial.print("ROJO:");
    Serial.print(valorRojo);
    Serial.print(",VERDE:");
    Serial.println(valorVerde);
  }
}
