:root {
  --bg-dark: #0B0E14;
  --bg-card: #141B24;
  --bg-sidebar: #0F131A;
  --primary: #6366F1;
  --primary-glow: rgba(99, 102, 241, 0.3);
  --red: #EF4444;
  --red-glow: rgba(239, 68, 68, 0.3);
  --green: #10B981;
  --green-glow: rgba(16, 185, 129, 0.3);
  --blue: #3B82F6;
  --blue-glow: rgba(59, 130, 246, 0.3);
  --yellow: #F59E0B;
  --yellow-glow: rgba(245, 158, 11, 0.3);
  --purple: #8B5CF6;
  --text-primary: #F3F4F6;
  --text-secondary: #9CA3AF;
  --border-color: #1F2937;
  --card-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: var(--bg-dark);
  color: var(--text-primary);
  min-height: 100vh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-sidebar);
}

::-webkit-scrollbar-thumb {
  background: #2D3748;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4A5568;
}

/* Layout principal */
.app {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
}

.sidebar-header {
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  color: var(--primary);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.logo-text span {
  color: var(--primary);
  font-weight: 300;
}

.sidebar-nav {
  flex: 1;
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.2s;
  font-weight: 500;
}

.nav-item:hover {
  background: rgba(99, 102, 241, 0.1);
  color: var(--text-primary);
}

.nav-item.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 8px 16px -4px var(--primary-glow);
}

.nav-icon {
  width: 20px;
  height: 20px;
}

.sidebar-footer {
  padding: 20px 16px;
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary), var(--purple));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: white;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.user-role {
  font-size: 12px;
  color: var(--text-secondary);
}

.logout-btn {
  width: 40px;
  height: 40px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.logout-btn:hover {
  background: #EF4444;
  color: white;
  border-color: #EF4444;
}

.logout-btn svg {
  width: 20px;
  height: 20px;
}

/* Main content */
.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 24px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 4px;
}

.breadcrumb {
  font-size: 14px;
  color: var(--text-secondary);
}

.breadcrumb .separator {
  margin: 0 8px;
}

.breadcrumb .current {
  color: var(--primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.system-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-card);
  padding: 8px 16px;
  border-radius: 30px;
  border: 1px solid var(--border-color);
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 12px var(--green-glow);
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.badge-text {
  font-size: 13px;
  font-weight: 500;
  color: var(--green);
}

.date-display {
  font-size: 14px;
  color: var(--text-secondary);
  background: var(--bg-card);
  padding: 8px 16px;
  border-radius: 30px;
  border: 1px solid var(--border-color);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  gap: 16px;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--card-shadow);
  border-color: var(--primary);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon.red {
  background: rgba(239, 68, 68, 0.1);
  color: var(--red);
}

.stat-icon.green {
  background: rgba(16, 185, 129, 0.1);
  color: var(--green);
}

.stat-icon.blue {
  background: rgba(59, 130, 246, 0.1);
  color: var(--blue);
}

.stat-icon.purple {
  background: rgba(139, 92, 246, 0.1);
  color: var(--purple);
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: var(--text-secondary);
  display: block;
  margin-bottom: 8px;
}

.stat-value-wrapper {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.stat-unit {
  font-size: 12px;
  color: var(--text-secondary);
}

.stat-trend {
  height: 2px;
  background: linear-gradient(90deg, var(--primary), transparent);
  border-radius: 1px;
}

.trend-indicator {
  display: block;
  height: 100%;
  width: 0%;
  background: var(--primary);
  border-radius: 1px;
}

.stat-progress {
  height: 4px;
  background: #1F2937;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 8px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--blue), var(--primary));
  border-radius: 2px;
  transition: width 0.3s ease;
}

.stat-sub {
  font-size: 11px;
  color: var(--text-secondary);
}

/* Chart Container */
.chart-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-title h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.chart-badges {
  display: flex;
  gap: 8px;
}

.badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #1F2937;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  color: var(--text-secondary);
}

.badge .badge-dot {
  width: 6px;
  height: 6px;
  box-shadow: none;
}

.badge .badge-dot.green {
  background: var(--green);
}

.badge .badge-dot.blue {
  background: var(--blue);
}

.chart-legend {
  display: flex;
  gap: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-secondary);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 4px;
}

.legend-color.red {
  background: var(--red);
  box-shadow: 0 0 10px var(--red-glow);
}

.legend-color.green {
  background: var(--green);
  box-shadow: 0 0 10px var(--green-glow);
}

.legend-color.yellow {
  background: var(--yellow);
  box-shadow: 0 0 10px var(--yellow-glow);
}

.chart-wrapper {
  height: 350px;
  position: relative;
}

/* Bottom Panel */
.bottom-panel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.panel-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.panel-icon {
  width: 20px;
  height: 20px;
  color: var(--primary);
}

/* LEDs Panel */
.leds-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.led-status {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #1F2937;
  border-radius: 12px;
  transition: all 0.2s;
}

.led-status:hover {
  background: #2D3748;
}

.led-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.led-indicator.red {
  background: var(--red);
  box-shadow: 0 0 12px var(--red-glow);
}

.led-indicator.green {
  background: var(--green);
  box-shadow: 0 0 12px var(--green-glow);
}

.led-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.led-name {
  font-size: 14px;
  font-weight: 600;
}

.led-pin {
  font-size: 11px;
  color: var(--text-secondary);
}

.led-threshold {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.threshold-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

.threshold-label {
  font-size: 10px;
  color: var(--text-secondary);
}

/* Info Panel */
.info-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #1F2937;
}

.info-row:last-child {
  border-bottom: none;
}

.info-key {
  font-size: 13px;
  color: var(--text-secondary);
}

.info-value {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  font-family: 'JetBrains Mono', monospace;
}

/* Threshold Panel */
.threshold-control {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.threshold-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.threshold-current {
  font-size: 14px;
  color: var(--text-secondary);
}

.threshold-current span {
  color: var(--primary);
  font-weight: 600;
  font-size: 18px;
}

.threshold-note {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #1F2937;
  border-radius: 12px;
}

.note-icon {
  font-size: 18px;
}

.note-text {
  font-size: 12px;
  color: var(--text-secondary);
}

/* Login Page */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0B0E14 0%, #141B24 100%);
}

.login-container {
  max-width: 420px;
  width: 90%;
}

.login-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 32px;
  padding: 40px;
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(10px);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.login-logo .logo-icon {
  width: 48px;
  height: 48px;
}

.login-logo .logo-text {
  font-size: 24px;
}

.login-header h2 {
  font-size: 20px;
  font-weight: 400;
  color: var(--text-secondary);
  margin-top: 8px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  background: #1F2937;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 14px 16px;
  color: var(--text-primary);
  font-size: 15px;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.login-button {
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
}

.login-button:hover {
  background: #4F46E5;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--primary-glow);
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  color: var(--red);
  padding: 12px;
  border-radius: 12px;
  text-align: center;
  font-size: 13px;
  border: 1px solid var(--red);
  margin-top: 16px;
}

/* Responsive */
@media (max-width: 1400px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .bottom-panel {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1200px) {
  .sidebar {
    width: 240px;
  }
  
  .main-content {
    margin-left: 240px;
  }
}

@media (max-width: 1024px) {
  .bottom-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
}
