export function renderSimpleBarChart(containerId, label, value) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <h4>${label}</h4>
    <div style="background:#ddd; width:100%; height:20px;">
      <div style="background:blue; width:${value}px; height:100%;"></div>
    </div>
  `;
}