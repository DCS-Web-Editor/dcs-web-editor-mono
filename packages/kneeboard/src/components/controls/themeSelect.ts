import { Component, Context } from "../..";
import { fontFamily, primaryColor, secondaryColor } from "../../colors";
import { load, save } from '../../cache';
import './themeSelect.css';

const component: Component = {
  id: 'theme-select',

  template: false,

  control: `<div>
<label>Theme</label>
<select id="theme-select-control">
  <option value="default">Xerox light</option>
  <option value="dark">Xerox dark</option>
  <option value="modern">Modern light</option>
  <option value="modern_dark">Modern dark</option>
  <option class="ww2" value="" disabled="true">WW II</option>
  <option class="ww2" value="ww2">&nbsp;&nbsp;USAF</option>
  <option class="ww2" value="ww2army">&nbsp;&nbsp;ARMY CORPS</option>
  <option class="ww2" value="ww2luftwaffe">&nbsp;&nbsp;LUFTWAFFE</option>
  <option class="ww2" value="ww2hand">&nbsp;&nbsp;Handwritten</option>
  <option class="ww2" value="ww2dark">&nbsp;&nbsp;Dark</option>
  <option class="seventies" disabled="true">70s</option>
  <option class="seventies" value="nam">&nbsp;&nbsp;Nam</option>
  <option class="seventies" value="namnoframe">&nbsp;&nbsp;No Frame</option>
  <option class="seventies" value="namhand">&nbsp;&nbsp;Handwritten</option>
  <option value="90s">90s</option>
  <option value="cyber">Cyber</option>
  <option value="ace">ACE Combat</option>
</select>
</div>
`,

  render: (c: Context) => {
    const kneeboardSelect = document.getElementById('theme-select-control')!;
    const storedTheme = load('theme') || 'default';
    
    kneeboardSelect.addEventListener('change', switchTheme)
    setTimeout(() => kneeboardSelect.value = storedTheme, 0);
    return '';
  },
}

export default component;


export function switchTheme(e) {
  const theme = e.target.value;
  
  document.querySelector('.kneeboard')!.setAttribute('data-theme', theme);
  save('theme', theme);

  refreshChart();

  // font styles take a while to update
  setTimeout(() => {
    refreshChart();
  }, 1000);

}

export function refreshChart() {
  if (window.waypointChart) updateChartColors(window.waypointChart);
  if (window.distanceChart) updateChartColors(window.distanceChart);
}





function updateChartColors(c) {
  const color = primaryColor();
  Chart.defaults.font.family = fontFamily();
  Chart.defaults.color = color;

  c.options.color = color;
  c.options.font.family = fontFamily();

  c.options.scales.x.title.color = color;
  c.options.scales.x.ticks.color = color;

  c.options.scales.y1.title.color = color;
  c.options.scales.y1.ticks.color = color;

  c.options.scales.y2.title.color = color;
  c.options.scales.y2.ticks.color = color;

  c.data.datasets[0].borderColor = color;
  c.data.datasets[0].fill.above = secondaryColor();

  c.data.datasets[1].borderColor = color;
  c.update();
}
