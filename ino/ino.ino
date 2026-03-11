// Pines
const int PIN_LDR = A0;           // LDR en analógico A0
const int PIN_LED_ROJO = A1;      // LED rojo en ANALÓGICO A1
const int PIN_LED_VERDE = A2;     // LED verde en ANALÓGICO A2

int valorLDR = 0;
unsigned long lastSend = 0;
const unsigned long INTERVALO_LDR = 100;  // ms entre lecturas

void setup() {
  // IMPORTANTE: Los pines analógicos como A1, A2 se usan como digitales
  pinMode(PIN_LED_ROJO, OUTPUT);
  pinMode(PIN_LED_VERDE, OUTPUT);
  
  // Para PNP: HIGH = apagado, LOW = encendido
  digitalWrite(PIN_LED_ROJO, HIGH);   // Inicia apagado
  digitalWrite(PIN_LED_VERDE, HIGH);  // Inicia apagado
  
  Serial.begin(9600);
}

void loop() {
  // Leer LDR cada 100ms
  if (millis() - lastSend >= INTERVALO_LDR) {
    lastSend = millis();
    valorLDR = analogRead(PIN_LDR);   // Leer ANALÓGICO del LDR
    Serial.print("LDR:");
    Serial.println(valorLDR);
  }

  // Procesar comandos (con lógica inversa para PNP)
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();

    if (cmd == "RED_ON") {
      digitalWrite(PIN_LED_ROJO, LOW);      // LOW enciende para PNP
      Serial.println("OK:RED_ON");
    }
    else if (cmd == "RED_OFF") {
      digitalWrite(PIN_LED_ROJO, HIGH);     // HIGH apaga para PNP
      Serial.println("OK:RED_OFF");
    }
    else if (cmd == "GREEN_ON") {
      digitalWrite(PIN_LED_VERDE, LOW);     // LOW enciende para PNP
      Serial.println("OK:GREEN_ON");
    }
    else if (cmd == "GREEN_OFF") {
      digitalWrite(PIN_LED_VERDE, HIGH);    // HIGH apaga para PNP
      Serial.println("OK:GREEN_OFF");
    }
    else if (cmd == "GET_LDR") {
      Serial.print("LDR:");
      Serial.println(valorLDR);
    }
    else {
      Serial.println("ERR:CMD");
    }
  }
}
