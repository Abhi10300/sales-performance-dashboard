/* ============================================================
   app.js — Dashboard controller
   Author: Abhishek Sharma | Data Analyst Portfolio
   ============================================================ */

/* ── Helpers ─────────────────────────────────────────────── */

const fmt = {
  currency: n => '$' + (n / 1000).toFixed(0) + 'K',
  millions: n => '$' + (n / 1_000_000).toFixed(2) + 'M',
  pct:      n => n.toFixed(1) + '%',
  num:      n => n.toLocaleString()
};

/* ── KPI Cards ────────────────────────────────────────────── */

function renderKPIs(data, year) {
  const totalRev  = data.revenue.reduce((a, b) => a + b, 0) * 1000;
  const totalTgt  = data.target.reduce((a, b) => a + b, 0) * 1000;
  const prevYear  = year === 2024 ? 2023 : 2022;
  const prevData  = SALES_DATA[prevYear];
  const prevReg   = document.getElementById('regionSel').value;
  const prevSrc   = prevData ? prevData[prevReg] : null;
  const prevRev   = prevSrc
    ? prevSrc.revenue.reduce((a, b) => a + b, 0) * 1000
    : totalRev * 0.88;

  const yoyGrowth  = ((totalRev - prevRev) / prevRev) * 100;
  const attainment = (totalRev / totalTgt) * 100;
  const avgOrder   = Math.round(totalRev / 4820);
  const convRate   = 24.7;

  const kpis = [
    {
      label: 'Total Revenue',
      value: fmt.millions(totalRev),
      badge: (yoyGrowth >= 0 ? '+' : '') + yoyGrowth.toFixed(1) + '% YoY',
      trend: yoyGrowth >= 0 ? 'up' : 'down',
      accent: '#4B3C8C'
    },
    {
      label: 'Target Attainment',
      value: fmt.pct(attainment),
      badge: attainment >= 100 ? 'Above target' : 'Below target',
      trend: attainment >= 100 ? 'up' : 'down',
      accent: '#1D9E75'
    },
    {
      label: 'Avg Order Value',
      value: '$' + avgOrder.toLocaleString(),
      badge: '+8.3% YoY',
      trend: 'up',
      accent: '#378ADD'
    },
    {
      label: 'Conversion Rate',
      value: convRate + '%',
      badge: '+1.2pp vs prev',
      trend: 'up',
      accent: '#BA7517'
    }
  ];

  document.getElementById('kpiGrid').innerHTML = kpis.map(k => `
    <div class="kpi-card" style="--accent-color:${k.accent}">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <span class="kpi-badge ${k.trend}">${k.badge}</span>
    </div>
  `).join('');
}

/* ── Legends ─────────────────────────────────────────────── */

function renderLegends() {
  document.getElementById('legend1').innerHTML = `
    <div class="legend-item"><span class="legend-dot" style="background:#4B3C8C"></span>Revenue</div>
    <div class="legend-item"><span class="legend-dot" style="background:#B4B2A9"></span>Target</div>
  `;

  document.getElementById('legend2').innerHTML = CATEGORY_DATA.labels.map((label, i) => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${CATEGORY_DATA.colors[i]}"></span>${label}
      <strong>${CATEGORY_DATA.values[i]}%</strong>
    </div>
  `).join('');
}

/* ── Products Table ─────────────────────────────────────── */

function renderTable() {
  document.getElementById('productsBody').innerHTML = PRODUCTS.map(p => {
    const aboveTarget = p.targetPct >= 100;
    const barColor    = aboveTarget ? '#1D9E75' : '#4B3C8C';
    const barWidth    = Math.min(p.targetPct, 100);
    return `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td>$${(p.revenue / 1000).toFixed(0)}K</td>
        <td>${fmt.num(p.units)}</td>
        <td>${p.margin}%</td>
        <td>
          <span class="pill ${aboveTarget ? 'above' : 'below'}">${p.targetPct}%</span>
        </td>
        <td>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${barWidth}%;background:${barColor}"></div>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/* ── Main Render ─────────────────────────────────────────── */

function render() {
  const year   = parseInt(document.getElementById('yearSel').value, 10);
  const region = document.getElementById('regionSel').value;
  const data   = SALES_DATA[year][region];

  ChartManager.destroy();
  renderKPIs(data, year);
  renderLegends();
  renderTable();

  ChartManager.drawRevenue('revenueChart',   data);
  ChartManager.drawCategory('categoryChart');
  ChartManager.drawRegions('regionChart',    year);
  ChartManager.drawGrowth('growthChart',     data.revenue);
}

/* ── Init ────────────────────────────────────────────────── */

document.getElementById('yearSel').addEventListener('change',   render);
document.getElementById('regionSel').addEventListener('change', render);

render();
