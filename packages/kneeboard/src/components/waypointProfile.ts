
import { MS_TO_KTS, M_TO_FEET } from '@dcs-web-editor-mono/utils'
import { Component, Context } from "..";
import './waypointProfile.css';
import { fontFamily, primaryColor, secondaryColor } from '../colors';


const component: Component = {
  id: 'waypoint-profile',

  template: `<div id="waypoint-profile">
  <h4 class="center">W A Y P O I N T &nbsp; P R O F I L E</h4>
  <canvas id="waypoint-chart"></canvas>
</div>`,

  control: ``,

  render: (c: Context) => {
    const {group} = c;
    
    setTimeout(() => createLineChart(group, 'waypoint-chart'), 0);
    
    return '';
  },
}

export default component;



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
          label : "Altitude feet",
          data : points.map(p => p.alt * M_TO_FEET),
          borderColor : primaryColor(),
          borderWidth : 1,
          // pointStyle: 'triangle',
          pointStyle: false,
          yAxisID: 'y1',
          fill: {
            target: 'origin',
            above: secondaryColor(),   // Area will be red above the origin
          }
        },
        {
          label : "Speed knots",
          data : points.map(p => p.speed * MS_TO_KTS),
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
            text: '- - - speed in knots - - -',
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
  

}

