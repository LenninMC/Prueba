const log = document.getElementById("log");
const btnRedOn = document.querySelector(".btn-red-on");
const btnRedOff = document.querySelector(".btn-red-off");
const btnGreenOn = document.querySelector(".btn-green-on");
const btnGreenOff = document.querySelector(".btn-green-off");

// Gráfica ROJA
const ctxRojo = document.getElementById('chartRojo').getContext('2d');
let chartRojo = new Chart(ctxRojo, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'LED Rojo (valor analógico)',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      tension: 0.1,
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { min: 0, max: 1023, title: { display: true, text: 'Valor (0-1023)' } }
    }
  }
});

// Gráfica VERDE
const ctxVerde = document.getElementById('chartVerde').getContext('2d');
let chartVerde = new Chart(ctxVerde, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'LED Verde (valor analógico)',
      data: [],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.1)',
      tension: 0.1,
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { min: 0, max: 1023, title: { display: true, text: 'Valor (0-1023)' } }
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

// Actualizar gráficas cada segundo
async function fetchEstado() {
  try {
    const r = await fetch("/api/estado");
    const j = await r.json();
    if (j.ok) {
      const ahora = new Date().toLocaleTimeString();

      // Actualizar ROJO
      chartRojo.data.labels.push(ahora);
      chartRojo.data.datasets[0].data.push(j.rojo);
      if (chartRojo.data.labels.length > 20) {
        chartRojo.data.labels.shift();
        chartRojo.data.datasets[0].data.shift();
      }
      chartRojo.update();

      // Actualizar VERDE
      chartVerde.data.labels.push(ahora);
      chartVerde.data.datasets[0].data.push(j.verde);
      if (chartVerde.data.labels.length > 20) {
        chartVerde.data.labels.shift();
        chartVerde.data.datasets[0].data.shift();
      }
      chartVerde.update();

      writeLog(`Rojo: ${j.rojo} | Verde: ${j.verde}`);
    } else {
      writeLog(`Error: ${j.error}`);
    }
  } catch (e) {
    writeLog(`Error de conexión: ${e}`);
  }
}

// Iniciar polling
setInterval(fetchEstado, 1000);
fetchEstado();
