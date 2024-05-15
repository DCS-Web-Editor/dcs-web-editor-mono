import { Component, Context } from "../types";
import { fontFamily, primaryColor, secondaryColor } from "../colors";
import { refreshChart } from "./controls/themeSelect";
import calculator from "../calculator";
import "./waypointDistanceProfile.css";

const component: Component = {
  id: "d-profile",

  control: ``,

  render: (c: Context) => {
    const { group } = c;
    const id = "waypoint-distance-chart";

    // remove previous
    destroyChart(id);

    // delay render to make sure element is present
    setTimeout(() => createLineChart(group, id), 1000);

    return `<h4 class="center">D-PROFILE</h4>
    <canvas id="${id}"></canvas>`;
  },
};

export default component;

function destroyChart(id: string) {
  const chart = Chart.getChart(id);
  if (chart) chart.destroy();

  window.distanceChart?.destroy();
  delete window.distanceChart;

  document.getElementById(id)?.remove();
}

function createLineChart(group: any, elementId: string) {
  const { points } = group.route;

  const element = document.getElementById(elementId);
  if (!element) return;
  Chart.defaults.font.family = fontFamily();
  Chart.defaults.color = primaryColor();

  const altitudeDistance = points.map((p) => ({ y: calculator.altitude(p.alt), x: p.track }));
  const speedDistance = points.map((p) => ({ y: calculator.speed(p.speed), x: p.track }));

  const chart = new Chart(element, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Altitude " + calculator.altitudeUnit(),
          data: altitudeDistance,
          borderColor: primaryColor(),
          borderWidth: 1,
          showLine: true,
          pointStyle: false,
          borderDash: [1, 2],
          yAxisID: "y1",
          fill: {
            target: "origin",
            above: secondaryColor(), // Area will be red above the origin
          },
        },
        {
          label: "Speed " + calculator.speedUnit(),
          data: speedDistance,
          showLine: true,

          borderColor: "#222222",
          pointStyle: false,
          borderWidth: 1,
          borderDash: [5, 5],
          stepped: false,
          yAxisID: "y2",
        },
      ],
    },
    options: {
      animation: false,
      stacked: false,
      scales: {
        x: {
          min: 1,
          title: {
            text: calculator.distanceUnit(),
            display: true,
            padding: 0,
          },
        },
        y1: {
          display: true,
          position: "left",
          min: 0,
          title: {
            text: "ft",
            display: false,
          },
        },
        y2: {
          display: true,
          position: "right",
          min: 0,
          title: {
            text: `- - - speed in ${calculator.speedUnit()} - - -`,
            display: true,
            padding: 0,
          },
        },
      },
      font: {
        family: fontFamily(),
      },
      plugins: {
        // datalabels: {
        //   rotation: 90
        // },
        legend: {
          position: "chartArea",
        },
      },
    },
    scales: {
      y1: {
        type: "linear",
      },
      y2: {
        type: "linear",
        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  });

  window.distanceChart = chart;

  // font styles take a while to update
  setTimeout(() => {
    refreshChart();
  }, 1000);
}
