import { Component, Context } from "../..";
import { fontFamily, primaryColor, secondaryColor } from "../../colors";
import { load, save } from "../../cache";
import "./themeSelect.css";

export const DEFAULT_THEME = "modern_bright";

const component: Component = {
  id: "theme-select",

  template: false,

  control: `<div>
<label>Theme</label>
<select id="theme-select-control">
  <option value="modern_bright" selected>Modern bright</option>
  <option value="modern">Modern light</option>
  <option value="modern_dark">Modern dark</option>
  <option value="xlight">Xerox light</option>
  <option value="dark">Xerox dark</option>
  <option value="80s">80s green</option>
  <option value="cyber">Cyber</option>
  <option value="ace">ACE Combat</option>
  
  <option class="ww2" disabled="true">WW II</option>
  <option value="ww2" class="ww2">&nbsp;&nbsp;USAF</option>
  <option value="ww2army" class="ww2">&nbsp;&nbsp;ARMY CORPS</option>
  <option value="ww2luftwaffe" class="ww2">&nbsp;&nbsp;LUFTWAFFE</option>
  <option value="ww2hand" class="ww2">&nbsp;&nbsp;Handwritten</option>
  <option value="ww2dark" class="ww2">&nbsp;&nbsp;Dark</option>

  <option disabled="true" class="seventies">70s</option>
  <option value="nam" class="seventies">&nbsp;&nbsp;Nam</option>
  <option value="namnoframe" class="seventies">&nbsp;&nbsp;No Frame</option>
  <option value="namhand" class="seventies">&nbsp;&nbsp;Handwritten</option>
</select>
</div>
`,

  render: (c: Context) => {
    const kneeboardSelect = document.getElementById("theme-select-control")!;
    const storedTheme = load("theme") || DEFAULT_THEME;

    kneeboardSelect.addEventListener("change", switchTheme);
    console.log(storedTheme, DEFAULT_THEME);

    setTimeout(() => (kneeboardSelect.value = storedTheme), 20);
    return "";
  },
};

export default component;

export function switchTheme(e) {
  const theme = e.target.value;

  document.querySelector(".kneeboard")!.setAttribute("data-theme", theme);
  save("theme", theme);

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
