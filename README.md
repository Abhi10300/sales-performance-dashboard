# Sales Performance Dashboard

**A Data Analyst portfolio project by Abhishek Sharma**

A fully interactive, responsive sales analytics dashboard built with vanilla JavaScript and Chart.js. Designed to demonstrate real-world data analyst skills: KPI tracking, trend analysis, regional breakdowns, and product performance.

---

## Live Demo

Open `index.html` directly in your browser — no build step required.

---

## Features

- **4 KPI Cards** — Total Revenue, Target Attainment, Average Order Value, Conversion Rate with YoY badges
- **Revenue vs Target** — Monthly bar chart with filter by year and region
- **Category Breakdown** — Doughnut chart: Software, Hardware, Services, Training
- **Regional Heatmap** — Horizontal bar comparing North / South / East / West
- **Growth Rate Trend** — Line chart showing month-over-month % change
- **Top Products Table** — Revenue, units, margin, and attainment progress bars
- **Year + Region filters** — All charts and KPIs update dynamically
- **Dark mode support** — Adapts to OS preference automatically
- **Fully responsive** — Works on desktop, tablet, and mobile

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| HTML5 | Structure |
| CSS3 | Styling, dark mode, responsive layout |
| JavaScript (ES6+) | Data logic, interactivity |
| Chart.js 4.4 | All chart rendering |

No frameworks. No build tools. Pure vanilla stack.

---

## File Structure

```
sales-dashboard/
├── index.html    # Main HTML layout
├── style.css     # All styles + dark mode + responsive
├── data.js       # Sales data (simulates API/SQL output)
├── charts.js     # Chart rendering module (ChartManager)
├── app.js        # Main controller — filters, KPIs, table
└── README.md
```

---

## How to Run

```bash
# Option 1: just open in browser
open index.html

# Option 2: run a local server
python -m http.server 8080
# then visit http://localhost:8080
```

---

## Skills Demonstrated

- Data aggregation and KPI computation (YoY growth, attainment %)
- Chart selection and design for different data types
- Clean modular JavaScript architecture
- Responsive UI design for data-heavy layouts
- Dark mode implementation using CSS custom properties

---

## About

Built by **Abhishek Sharma** as part of a Data Analyst portfolio.

- Email: abhisharma10300@gmail.com
- LinkedIn: [linkedin.com/in/abhishek-sharma-098b97239](https://linkedin.com/in/abhishek-sharma-098b97239)

Skills: Python · SQL · Power BI · Excel · Machine Learning
