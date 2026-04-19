/* ============================================================
   charts.js — Chart rendering module
   Author: Abhishek Sharma | Data Analyst Portfolio
   ============================================================ */

const ChartManager = (() => {
  const instances = {};

  function destroy() {
    Object.values(instances).forEach(c => c.destroy());
    Object.keys(instances).forEach(k => delete instances[k]);
  }

  /* Shared axis styling */
  const xAxis = (autoSkip = true) => ({
    ticks: { font: { size: 11 }, autoSkip, maxRotation: 0, color: '#888' },
    grid: { display: false }
  });
  const yAxis = (callback) => ({
    ticks: { callback, font: { size: 11 }, color: '#888' },
    grid: { color: 'rgba(128,128,128,0.08)' }
  });

  /* ── Revenue vs Target bar chart ── */
  function drawRevenue(canvasId, data) {
    instances.revenue = new Chart(document.getElementById(canvasId), {
      type: 'bar',
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: 'Revenue',
            data: data.revenue.map(v => v * 1000),
            backgroundColor: PALETTE.purple,
            borderRadius: 3,
            borderSkipped: false
          },
          {
            label: 'Target',
            data: data.target.map(v => v * 1000),
            backgroundColor: PALETTE.gray,
            borderRadius: 3,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: $${(ctx.raw / 1000).toFixed(0)}K`
            }
          }
        },
        scales: {
          x: xAxis(false),
          y: yAxis(v => '$' + (v / 1000).toFixed(0) + 'K')
        }
      }
    });
  }

  /* ── Category doughnut chart ── */
  function drawCategory(canvasId) {
    instances.category = new Chart(document.getElementById(canvasId), {
      type: 'doughnut',
      data: {
        labels: CATEGORY_DATA.labels,
        datasets: [{
          data: CATEGORY_DATA.values,
          backgroundColor: CATEGORY_DATA.colors,
          borderWidth: 3,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.label}: ${ctx.raw}%`
            }
          }
        }
      }
    });
  }

  /* ── Regional horizontal bar chart ── */
  function drawRegions(canvasId, year) {
    const regions = ['north', 'south', 'east', 'west'];
    const labels  = ['North', 'South', 'East', 'West'];
    const values  = regions.map(r =>
      SALES_DATA[year][r].revenue.reduce((a, b) => a + b, 0) * 1000
    );

    instances.region = new Chart(document.getElementById(canvasId), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Revenue',
          data: values,
          backgroundColor: regions.map(r => REGION_COLORS[r]),
          borderRadius: 3,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` $${(ctx.raw / 1000000).toFixed(2)}M`
            }
          }
        },
        scales: {
          x: yAxis(v => '$' + (v / 1000).toFixed(0) + 'K'),
          y: { ticks: { font: { size: 12 }, color: '#888' }, grid: { display: false } }
        }
      }
    });
  }

  /* ── Monthly growth rate line chart ── */
  function drawGrowth(canvasId, revenue) {
    const growthRates = revenue.map((v, i) =>
      i === 0 ? 0 : parseFloat((((v - revenue[i - 1]) / revenue[i - 1]) * 100).toFixed(1))
    );

    instances.growth = new Chart(document.getElementById(canvasId), {
      type: 'line',
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: 'Growth %',
            data: growthRates,
            borderColor: PALETTE.teal,
            backgroundColor: 'rgba(29,158,117,0.07)',
            pointBackgroundColor: PALETTE.teal,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.35,
            fill: true,
            borderWidth: 2
          },
          {
            label: 'Baseline',
            data: MONTHS.map(() => 0),
            borderColor: 'rgba(150,150,150,0.4)',
            borderDash: [5, 4],
            borderWidth: 1,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ctx.datasetIndex === 0 ? ` ${ctx.raw}%` : null,
              filter: item => item.datasetIndex === 0
            }
          }
        },
        scales: {
          x: xAxis(false),
          y: yAxis(v => v + '%')
        }
      }
    });
  }

  return { destroy, drawRevenue, drawCategory, drawRegions, drawGrowth };
})();
