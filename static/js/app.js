const log = document.getElementById("log");
const btnRedOn = document.querySelector(".btn-red-on");
const btnRedOff = document.querySelector(".btn-red-off");
const btnGreenOn = document.querySelector(".btn-green-on");
const btnGreenOff = document.querySelector(".btn-green-off");

// Configuración de la gráfica
const ctx = document.getElementById('ldrChart').getContext('2d');
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], // tiempo (se llenará con índices)
    datasets: [{
      label: 'Valor LDR (0-1023)',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { min: 0, max: 1023 }
    }
  }
});

function writeLog(msg) {
  log.textContent = msg + "\n" + log.textContent;
}

async function setLed(led, action) {
  const r = await fetch("/set_led", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ led: led, action: action })
  });

  const j = await r.json();
  if (j.ok) writeLog(`${j.cmd} -> ${j.resp}`);
  else writeLog(`ERROR -> ${j.error || j.resp}`);
}

btnRedOn.addEventListener("click", () => setLed("rojo", "on"));
btnRedOff.addEventListener("click", () => setLed("rojo", "off"));
btnGreenOn.addEventListener("click", () => setLed("verde", "on"));
btnGreenOff.addEventListener("click", () => setLed("verde", "off"));

// Actualizar gráfica cada segundo
async function fetchLDR() {
  try {
    const r = await fetch("/api/ldr");
    const j = await r.json();
    if (j.ok) {
      const valor = j.valor;
      writeLog(`LDR: ${valor}`);

      // Actualizar dataset (mantener últimos 20 puntos)
      chart.data.labels.push(chart.data.labels.length);  // índice como label
      chart.data.datasets[0].data.push(valor);

      if (chart.data.labels.length > 20) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
      }

      chart.update();
    } else {
      writeLog(`Error LDR: ${j.error}`);
    }
  } catch (e) {
    writeLog(`Error de conexión: ${e}`);
  }
}

// Llamar a fetchLDR cada 1 segundo
setInterval(fetchLDR, 1000);
// Llamar inmediatamente al cargar
fetchLDR();
