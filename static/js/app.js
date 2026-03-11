const log = document.getElementById("log");
const valorRojoEl = document.getElementById("valor-rojo");
const valorVerdeEl = document.getElementById("valor-verde");

// Gráfica ROJA
const ctxRojo = document.getElementById('chartRojo').getContext('2d');
let chartRojo = new Chart(ctxRojo, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'LED Rojo',
      data: [],
      borderColor: '#ff6b6b',
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#ff6b6b',
      pointBorderColor: 'white',
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        min: 0,
        max: 1023,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        },
        title: {
          display: true,
          text: 'Valor analógico'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
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
      label: 'LED Verde',
      data: [],
      borderColor: '#51cf66',
      backgroundColor: 'rgba(81, 207, 102, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#51cf66',
      pointBorderColor: 'white',
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        min: 0,
        max: 1023,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        },
        title: {
          display: true,
          text: 'Valor analógico'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  }
});

function writeLog(msg) {
  if (log) {
    log.textContent = msg + "\n" + log.textContent;
    if (log.textContent.split('\n').length > 10) {
      log.textContent = log.textContent.split('\n').slice(0, 10).join('\n');
    }
  }
}

// Actualizar gráficas cada segundo
async function fetchEstado() {
  try {
    const r = await fetch("/api/estado");
    const j = await r.json();
    if (j.ok) {
      const ahora = new Date().toLocaleTimeString();

      // Actualizar valores en tarjetas
      if (valorRojoEl) valorRojoEl.textContent = j.rojo;
      if (valorVerdeEl) valorVerdeEl.textContent = j.verde;

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
