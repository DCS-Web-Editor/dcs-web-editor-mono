import "handsontable/dist/handsontable.min.css";

import _ from "lodash";

export interface Component {
  template?: boolean;
  render: (c: Context) => string | Promise<any>;
  id: string;
  control?: string;
}

export interface Context {
  unitName: string;
  groupName: string;
  category: string;
  countryName: string;
  coalitionName: string;
  mission: any;
  dictionary: any;
  coalition: any;
  countries: any;
  country: any;
  groups: any;
  group: any;
  unit: any;
}

// Controls
import themeSelect, { DEFAULT_THEME, switchTheme } from "./components/controls/themeSelect";
import metricSelect from "./components/controls/metricSelect";
import coordinateSelect from "./components/controls/coordinateSelect";
import spacingSelect from "./components/controls/spacingSelect";
import screenshot from "./components/controls/screenshot";
import downloadAll from "./components/controls/downloadAll";

// Components
import date from "./components/date";
import title from "./components/title";
import mainTask from "./components/mainTask";
import coalitionTask from "./components/coalitionTask";
import bullseye from "./components/bullseye";
import friendlies from "./components/friendlies";
import group from "./components/group";
import unit from "./components/unit";
import weather from "./components/weather";
import loadout from "./components/loadout";
import radio from "./components/radio";
import awacs from "./components/awacs";
import tanker from "./components/tanker";
import carrier from "./components/carrier";
import waypoints from "./components/waypoints/waypoints";
import waypointProfile from "./components/waypointProfile";
import waypointDistanceProfile from "./components/waypointDistanceProfile";
import notes from "./components/notes";
import { load, save } from "./cache";
import "./accordion.css";

const registeredComponents: Component[] = [];

export function register(...components: Component[]) {
  registeredComponents.push(...components);
}

(function init() {
  register(
    // Controls
    themeSelect,
    spacingSelect,
    metricSelect,
    coordinateSelect,

    // Components
    date,
    title,
    mainTask,
    coalitionTask,
    unit,
    group,
    bullseye,
    friendlies,
    awacs,
    tanker,
    carrier,
    weather,
    loadout,
    radio,
    screenshot,
    waypoints,
    waypointProfile,
    waypointDistanceProfile,
    downloadAll,
    notes
  );
})();

let _root;
let context: Context;

export function createKneeboard(element) {
  _root = element;

  const HTML = `
  <div id="capture">
  <img src="img/dcs web editor.png" id="logo"/>
    <div id="mask" class="no-print"></div>
    <div id="content" name="">
      <span id="dwv-info">D C S &nbsp; W E B &nbsp; E D I T O R</span>
        ${
          // Add component templates
          registeredComponents
            .map(
              (component) =>
                `<div class="${component.template === false ? "" : "kneeboard-section"}" id="${
                  component.id
                }"></div>`
            )
            .join("\n")
        }          
        <div class="spacer kneeboard-section"></div>  
    </div>
  </div>
  
  <div class="controls no-print accordion">
    <div class="tab">
      <input class="hidden" type="checkbox" checked name="accordion-knb-1" id="knb1">

      <div class="tab__label" style="width: 100%">
        <label for="knb1" style="width: 100%">Settings & Downloads</label>
      </div>
      <div class="tab__content">
        ${
          // Add control buttons
          registeredComponents.map((component) => component.control).join("\n")
        }
      </div>
    </div>

    <hr>
    <div class="kneeboard-sections tab">
      <input class="hidden" type="checkbox" checked name="accordion-knb-2" id="knb2">

      <div class="tab__label" style="width: 100%">
        <label for="knb2" style="width: 100%">Kneeboard Sections</label>
      </div>
      <div class="tab__content">

      ${
        // Add control checkbox toggles
        registeredComponents
          .map((component) => {
            const { id, control, template } = component;
            if (template === false) return "";

            const checked = load("hidden-" + id) ? "" : "checked";

            return `
            <label for="checkbox-${id}">
              <input name="${id}" id="checkbox-${id}" ${checked} type="checkbox" />
              ${_.startCase(id)}
            </label>
          `;
          })
          .join("\n")
      }

    </div>
    </div>
  </div>
  `;
  _root.innerHTML = HTML;
}

export function renderKneeboard(
  unitName: string,
  groupName: string,
  category: string,
  countryName: string,
  coalitionName: string,
  mission: any,
  dictionary: any,
  options = {}
) {
  // console.log(unitName, groupName, category, countryName, coalitionName, !!mission, !!dictionary);

  const coalition = mission.coalition[coalitionName];
  const countries = coalition.country;
  const country = countries.find((c) => c.name === countryName)!;
  const groups = country[category].group;
  const group = groups.find((g) => g.name === groupName)!;
  const unit = group.units.find((u) => u.name === unitName);

  context = {
    unitName,
    groupName,
    category,
    countryName,
    coalitionName,
    mission,
    dictionary,
    coalition,
    countries,
    country,
    groups,
    group,
    unit,
  };

  document.querySelector("#content")?.setAttribute("name", unitName);

  const storedTheme = load("theme") || DEFAULT_THEME;
  setTimeout(() => switchTheme({ target: { value: storedTheme } }), 10);

  // render all registered components
  setTimeout(() => renderRegisteredComponents(context, options.noControls), 10);

  return refresh;
}

export function refresh() {
  // console.debug('refresh');

  setTimeout(() => renderRegisteredComponents(context, true), 10);
}

function renderRegisteredComponents(c: Context, noControls = false) {
  registeredComponents.forEach((component) => {
    if (component.template !== false || noControls === false) {
      render(component.id, component.render(c));
    }

    // add toggle event listeners
    if (component.template !== false) {
      const toggle = document.querySelector(`input[name="${component.id}"]`)!;
      toggle.addEventListener("change", toggleHandler);
      if (load("hidden-" + component.id))
        document.getElementById(component.id)?.classList.add("hidden");
    }
  });
}

function toggleHandler(e: Event) {
  const { name, checked } = e.target;
  const section = document.getElementById(name)!;

  if (checked) section.classList.remove("hidden");
  else section.classList.add("hidden");

  save("hidden-" + name, !checked);
}

async function render(id: string, value: string | Promise<any>) {
  if ((value as Promise<any>)?.then) value = await value;
  document.getElementById(id)!.innerHTML = value as string;
}
