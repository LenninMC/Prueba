// Pines
const int PIN_LDR = A0;
const int PIN_LED_ROJO = 12;
const int PIN_LED_VERDE = 13;

// Variables para control de tiempo de envío de LDR
unsigned long lastLDRSend = 0;
const unsigned long LDR_INTERVAL = 100; // ms

void setup() {
  pinMode(PIN_LED_ROJO, OUTPUT);
  pinMode(PIN_LED_VERDE, OUTPUT);
  digitalWrite(PIN_LED_ROJO, LOW);
  digitalWrite(PIN_LED_VERDE, LOW);
  Serial.begin(9600);
}

void loop() {
  // Leer LDR y enviar cada cierto tiempo
  if (millis() - lastLDRSend >= LDR_INTERVAL) {
    lastLDRSend = millis();
    int ldrValue = analogRead(PIN_LDR);
    Serial.print("LDR:");
    Serial.println(ldrValue);
  }

  // Atender comandos seriales
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();

    if (cmd == "RED_ON") {
      digitalWrite(PIN_LED_ROJO, HIGH);
      Serial.println("OK:RED_ON");
    } else if (cmd == "RED_OFF") {
      digitalWrite(PIN_LED_ROJO, LOW);
      Serial.println("OK:RED_OFF");
    } else if (cmd == "GREEN_ON") {
      digitalWrite(PIN_LED_VERDE, HIGH);
      Serial.println("OK:GREEN_ON");
    } else if (cmd == "GREEN_OFF") {
      digitalWrite(PIN_LED_VERDE, LOW);
      Serial.println("OK:GREEN_OFF");
    } else {
      Serial.println("ERR:CMD");
    }
  }
}
