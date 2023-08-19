import { Component, Context } from "../..";
import { fontFamily, primaryColor, secondaryColor } from "../../colors";

const component: Component = {
  id: 'theme-select',

  template: '',

  control:
`<select id="theme-select">
  <option value="default">Typewriter light</option>
  <option value="dark">Typewriter dark</option>
  <option value="modern">Modern light</option>
  <option value="modern_dark">Modern dark</option>
  <option value="90s">90s</option>
  <option value="cyber">Cyber</option>
  <option value="ace">ACE Combat</option>
</select>`,

  render: (c: Context) => {
    const kneeboardSelect = document.getElementById('theme-select')!;
    const storedTheme = localStorage.getItem('kneeboard-theme') || 'default';
    
    kneeboardSelect.addEventListener('change', switchTheme)
    setTimeout(() => kneeboardSelect.value = storedTheme, 0);
    return '';
  },
}

export default component;


export function switchTheme(e) {
  const theme = e.target.value;
  
  document.querySelector('.kneeboard')!.setAttribute('data-theme', theme);
  localStorage.setItem('kneeboard-theme', theme);

  refreshChart();

  // font styles take a while to update
  setTimeout(() => {
    refreshChart();
  }, 1000);

}

export function refreshChart() {
  if (window.waypointChart) {
      const color = primaryColor();
      Chart.defaults.font.family = fontFamily();
      Chart.defaults.color = color;

      window.waypointChart.options.color = color;
      window.waypointChart.options.font.family = fontFamily();

      window.waypointChart.options.scales.x.title.color = color;
      window.waypointChart.options.scales.x.ticks.color = color;

      window.waypointChart.options.scales.y1.title.color = color;
      window.waypointChart.options.scales.y1.ticks.color = color;

      window.waypointChart.options.scales.y2.title.color = color;
      window.waypointChart.options.scales.y2.ticks.color = color;

      window.waypointChart.data.datasets[0].borderColor = color;
      window.waypointChart.data.datasets[0].fill.above = secondaryColor();

      window.waypointChart.data.datasets[1].borderColor = color;
      window.waypointChart.update();
  }
}




