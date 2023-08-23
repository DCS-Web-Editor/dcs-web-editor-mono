
import { Component, Context } from "..";
import './waypointProfile.css';
import { fontFamily, primaryColor, secondaryColor } from '../colors';
import { refreshChart } from './controls/themeSelect';
import calculator from '../calculator';


const component: Component = {
  id: 'waypoint-profile',

  control: ``,

  render: (c: Context) => {
    const {group} = c;
    const id = 'waypoint-chart';

    // remove previous
    destroyChart(id);
    
    // delay render to make sure element is present
    setTimeout(() => createLineChart(group, id), 1000);
    
    return `<h4 class="center">W A Y P O I N T &nbsp; P R O F I L E</h4>
    <canvas id="waypoint-chart"></canvas>`;
  },
}

export default component;



function destroyChart(id: string) {
  // console.log('destroyChart', id);
  
  
  const chart = Chart.getChart(id);
  if (chart) chart.destroy();

  window.waypointChart?.destroy();
  delete window.waypointChart;

  document.getElementById(id)?.remove();
}

function createLineChart(group: any, elementId: string) {
  const { points } = group.route;
  
  const element = document.getElementById(elementId)!;
  Chart.defaults.font.family = fontFamily();
  Chart.defaults.color = primaryColor();


  const chart = new Chart(element, {
    type : 'line',
    data : {
      labels : points.map((p, i: number) => `${i + 1}: ${p.name}`),
      datasets : [
        {
          label : "Altitude " + calculator.altitudeUnit(),
          data : points.map(p => calculator.altitude(p.alt)),
          borderColor : primaryColor(),
          borderWidth : 1,
          // pointStyle: 'triangle',
          pointStyle: false,
          borderDash: [1,2],
          yAxisID: 'y1',
          fill: {
            target: 'origin',
            above: secondaryColor(),   // Area will be red above the origin
          }
        },
        {
          label : "Speed " + calculator.speedUnit(),
          data : points.map(p => calculator.speed(p.speed)),
          borderColor : "#222222",
          pointStyle: false,
          borderWidth: 1,
          borderDash: [5, 5],
          dashed: true,
          stepped: false,
          yAxisID: 'y2',

        } ]
    },
    options : {
      animation: false,
      stacked: false,
      scales: {
        y1: {
          display: true,
          position: 'left',
          min: 0,
          title: {
            text: 'ft',
            display: false,
          },
        },
        y2: {
          display: true,
          position: 'right',
          min: 0,
          title: {
            text: `- - - speed in ${calculator.speedUnit()} - - -`,
            display: true,
            padding: 0,
          },
        }
      },
      font: {
        family: fontFamily()
      }
    },
    scales: {
      y1: {
        type: 'linear',
      },
      y2: {
        type: 'linear',
        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  });

  window.waypointChart = chart;

  // font styles take a while to update
  setTimeout(() => {
    refreshChart()
  }, 1000);

}

