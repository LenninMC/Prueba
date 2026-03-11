// Elementos del DOM
const ldrValue = document.getElementById('ldr-value');
const ldrBar = document.getElementById('ldr-bar');
const ledRojoValor = document.getElementById('led-rojo-valor');
const ledVerdeValor = document.getElementById('led-verde-valor');
const ledRojoIndicator = document.getElementById('led-rojo-indicator');
const ledVerdeIndicator = document.getElementById('led-verde-indicator');
const ultimaActualizacion = document.getElementById('ultima-actualizacion');

// Configuración del umbral (ajústalo según tu necesidad)
const UMBRAL = 512; // Mitad del rango 0-1023

// Configuración de la gráfica principal
const ctx = document.getElementById('mainChart').getContext('2d');
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'LED Rojo',
        data: [],
        borderColor: '#ff4444',
        backgroundColor: 'rgba(255, 68, 68, 0.1)',
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3,
        fill: true
      },
      {
        label: 'LED Verde',
        data: [],
        borderColor: '#00ff9d',
        backgroundColor: 'rgba(0, 255, 157, 0.1)',
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3,
        fill: true
      },
      {
        label: 'Umbral',
        data: [],
        borderColor: '#ffaa00',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        type: 'line'
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        min: 0,
        max: 1023,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#8d9db0',
          stepSize: 200
        },
        title: {
          display: true,
          text: 'Valor analógico',
          color: '#8d9db0'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#8d9db0',
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  }
});

// Actualizar indicadores de LEDs
function updateLEDIndicators(rojo, verde) {
  // LED Rojo
  if (ledRojoIndicator) {
    if (rojo > UMBRAL) {
      ledRojoIndicator.className = 'led-indicator active-red';
    } else {
      ledRojoIndicator.className = 'led-indicator';
    }
  }
  
  // LED Verde
  if (ledVerdeIndicator) {
    if (verde > UMBRAL) {
      ledVerdeIndicator.className = 'led-indicator active-green';
    } else {
      ledVerdeIndicator.className = 'led-indicator';
    }
  }
}

// Actualizar gráfica
function updateChart(rojo, verde) {
  const ahora = new Date().toLocaleTimeString();
  
  // Añadir nuevos puntos
  chart.data.labels.push(ahora);
  chart.data.datasets[0].data.push(rojo);
  chart.data.datasets[1].data.push(verde);
  chart.data.datasets[2].data.push(UMBRAL); // Línea de umbral constante
  
  // Mantener últimos 20 puntos
  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
    chart.data.datasets[1].data.shift();
    chart.data.datasets[2].data.shift();
  }
  
  chart.update();
}

// Fetch estado desde el servidor
async function fetchEstado() {
  try {
    const r = await fetch("/api/estado");
    const j = await r.json();
    
    if (j.ok) {
      // Actualizar valores LDR (usamos el promedio de rojo y verde como simulación)
      // En un sistema real, el LDR vendría por separado
      const ldrSimulado = Math.round((j.rojo + j.verde) / 2);
      
      if (ldrValue) ldrValue.textContent = ldrSimulado;
      if (ldrBar) ldrBar.style.width = `${(ldrSimulado / 1023) * 100}%`;
      
      // Actualizar valores de LEDs
      if (ledRojoValor) ledRojoValor.textContent = j.rojo;
      if (ledVerdeValor) ledVerdeValor.textContent = j.verde;
      
      // Actualizar indicadores visuales
      updateLEDIndicators(j.rojo, j.verde);
      
      // Actualizar gráfica
      updateChart(j.rojo, j.verde);
      
      // Actualizar timestamp
      if (ultimaActualizacion) {
        const ahora = new Date();
        const fecha = ahora.toLocaleDateString('es-ES');
        const hora = ahora.toLocaleTimeString('es-ES');
        ultimaActualizacion.textContent = `${fecha} ${hora}`;
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Iniciar polling cada segundo
setInterval(fetchEstado, 1000);
fetchEstado(); // Llamada inicial
