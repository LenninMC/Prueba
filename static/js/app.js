// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM cargado, iniciando sistema...");

    // ===========================================
    // 1. VERIFICAR QUE EL CANVAS EXISTA
    // ===========================================
    const canvas = document.getElementById('mainChart');
    if (!canvas) {
        console.error("❌ ERROR: No se encontró el elemento canvas con id 'mainChart'");
        return;
    }
    console.log("✅ Canvas encontrado");

    // ===========================================
    // 2. OBTENER CONTEXTO Y CREAR GRÁFICA
    // ===========================================
    const ctx = canvas.getContext('2d');
    
    // Destruir gráfica existente si la hay (por si acaso)
    if (window.miChart) {
        window.miChart.destroy();
    }

    // Crear nueva gráfica
    window.miChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Aquí irán las marcas de tiempo
            datasets: [
                {
                    label: 'LED Rojo',
                    data: [],
                    borderColor: '#FF4444',
                    backgroundColor: 'rgba(255, 68, 68, 0.1)',
                    borderWidth: 3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'LED Verde',
                    data: [],
                    borderColor: '#00C851',
                    backgroundColor: 'rgba(0, 200, 81, 0.1)',
                    borderWidth: 3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 300
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#fff',
                        font: { size: 12 }
                    }
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
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { 
                        color: '#aaa',
                        stepSize: 200
                    },
                    title: {
                        display: true,
                        text: 'Valor analógico',
                        color: '#aaa'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { 
                        color: '#aaa',
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
    
    console.log("✅ Gráfica creada exitosamente");

    // ===========================================
    // 3. FUNCIÓN PARA OBTENER DATOS DEL SERVIDOR
    // ===========================================
    async function obtenerDatos() {
        try {
            console.log("📡 Solicitando datos a /api/estado...");
            
            const response = await fetch('/api/estado');
            const data = await response.json();
            
            console.log("📦 Datos recibidos:", data);
            
            if (data.ok) {
                // Actualizar valores en la interfaz
                actualizarValores(data.rojo, data.verde);
                
                // Actualizar gráfica
                actualizarGrafica(data.rojo, data.verde);
            } else {
                console.error("❌ Error en datos:", data.error);
            }
        } catch (error) {
            console.error("❌ Error de conexión:", error);
        }
    }

    // ===========================================
    // 4. ACTUALIZAR VALORES EN TARJETAS
    // ===========================================
    function actualizarValores(rojo, verde) {
        // LED Rojo
        const rojoEl = document.getElementById('led-rojo-valor');
        if (rojoEl) {
            rojoEl.textContent = rojo;
            console.log(`🔴 LED Rojo actualizado: ${rojo}`);
        }
        
        // LED Verde
        const verdeEl = document.getElementById('led-verde-valor');
        if (verdeEl) {
            verdeEl.textContent = verde;
            console.log(`🟢 LED Verde actualizado: ${verde}`);
        }
        
        // LDR (simulado como promedio)
        const ldr = Math.round((rojo + verde) / 2);
        const ldrEl = document.getElementById('ldr-valor');
        if (ldrEl) {
            ldrEl.textContent = ldr;
        }
        
        // Barra de progreso LDR
        const progressBar = document.getElementById('ldr-progress');
        if (progressBar) {
            const porcentaje = (ldr / 1023) * 100;
            progressBar.style.width = porcentaje + '%';
        }
        
        // Última actualización
        const fechaEl = document.getElementById('ultima-actualizacion');
        if (fechaEl) {
            const ahora = new Date();
            const fechaStr = ahora.toLocaleDateString() + ' ' + 
                           ahora.toLocaleTimeString();
            fechaEl.textContent = fechaStr;
        }
    }

    // ===========================================
    // 5. ACTUALIZAR GRÁFICA
    // ===========================================
    function actualizarGrafica(rojo, verde) {
        // Crear marca de tiempo (HH:MM:SS)
        const ahora = new Date();
        const tiempo = ahora.getHours().toString().padStart(2, '0') + ':' +
                      ahora.getMinutes().toString().padStart(2, '0') + ':' +
                      ahora.getSeconds().toString().padStart(2, '0');
        
        console.log(`⏱️  Nuevo punto: ${tiempo} - Rojo: ${rojo}, Verde: ${verde}`);
        
        // Agregar nuevos datos
        window.miChart.data.labels.push(tiempo);
        window.miChart.data.datasets[0].data.push(rojo);
        window.miChart.data.datasets[1].data.push(verde);
        
        // Mantener solo últimos 20 puntos
        if (window.miChart.data.labels.length > 20) {
            window.miChart.data.labels.shift();
            window.miChart.data.datasets[0].data.shift();
            window.miChart.data.datasets[1].data.shift();
        }
        
        // Redibujar gráfica
        window.miChart.update();
        console.log("✅ Gráfica actualizada, puntos:", window.miChart.data.labels.length);
    }

    // ===========================================
    // 6. INICIAR POLLING
    // ===========================================
    console.log("🚀 Iniciando monitoreo...");
    obtenerDatos(); // Llamada inmediata
    setInterval(obtenerDatos, 1000); // Cada segundo
});
