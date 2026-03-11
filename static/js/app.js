// Gráfica ROJA
const ctxRojo = document.getElementById('chartRojo').getContext('2d');
let chartRojo = new Chart(ctxRojo, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'LED Rojo',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }]
  },
  options: {
    responsive: true,
    scales: { y: { min: 0, max: 1023 } }
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
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  },
  options: {
    responsive: true,
    scales: { y: { min: 0, max: 1023 } }
  }
});

async function fetchEstados() {
  try {
    const r = await fetch("/api/estado");
    const j = await r.json();
    if (j.ok) {
      // Actualizar ROJO
      chartRojo.data.labels.push(new Date().toLocaleTimeString());
      chartRojo.data.datasets[0].data.push(j.rojo);
      if (chartRojo.data.labels.length > 20) {
        chartRojo.data.labels.shift();
        chartRojo.data.datasets[0].data.shift();
      }
      chartRojo.update();

      // Actualizar VERDE
      chartVerde.data.labels.push(new Date().toLocaleTimeString());
      chartVerde.data.datasets[0].data.push(j.verde);
      if (chartVerde.data.labels.length > 20) {
        chartVerde.data.labels.shift();
        chartVerde.data.datasets[0].data.shift();
      }
      chartVerde.update();

      writeLog(`Rojo: ${j.rojo} | Verde: ${j.verde}`);
    }
  } catch (e) {
    writeLog(`Error: ${e}`);
  }
}

setInterval(fetchEstados, 1000);
fetchEstados();
