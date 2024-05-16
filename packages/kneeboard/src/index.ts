import "handsontable/dist/handsontable.min.css";

import _ from "lodash";

// Controls
import themeSelect, { DEFAULT_THEME, switchTheme } from "./components/controls/themeSelect";
import metricSelect from "./components/controls/metricSelect";
import coordinateSelect from "./components/controls/coordinateSelect";
import spacingSelect from "./components/controls/spacingSelect";
import screenshot from "./components/controls/screenshot";
import downloadAll from "./components/controls/downloadAll";
import csv from "./components/controls/csv";

// Components
import date from "./components/date";
import title from "./components/title";
import mainTask from "./components/mainTask";
import coalitionTask from "./components/coalitionTask";
import bullseye from "./components/bullseye";
import airports from "./components/airports";
import friendlies from "./components/friendlies";
import packages from "./components/packages";
import group from "./components/group";
import unit from "./components/unit";
import weather from "./components/weather";
import loadout from "./components/loadout";
import fuel from "./components/fuel/fuel";
import laserCodes from "./components/laserCodes";
import radio from "./components/radio";
import awacs from "./components/awacs";
import tanker from "./components/tanker";
import carrier from "./components/carrier";
import waypoints from "./components/waypoints/waypoints";
import waypointProfile from "./components/waypointProfile";
import waypointDistanceProfile from "./components/waypointDistanceProfile";
import notes from "./components/notes";
import { load } from "./cache";
import "./accordion.css";
import { renderRegisteredComponents } from "./render";
import { Component, Context } from "./types";
import state from "./state";

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
    // csv,

    // Components
    date,
    title,
    mainTask,
    coalitionTask,
    bullseye,
    airports,
    unit,
    group,
    friendlies,
    packages,
    awacs,
    tanker,
    carrier,
    weather,
    laserCodes,
    loadout,
    fuel,
    radio,
    screenshot,
    waypoints,
    waypointProfile,
    waypointDistanceProfile,
    downloadAll,
    notes
  );
})();

let _root: HTMLElement;
let context: Context;

export function createKneeboard(element: HTMLElement) {
  _root = element;
  state.airports = null;

  const HTML = `

  <div id="capture">
  <!-- <div id="mask" class="no-print"></div> -->
  <!-- <img src="img/dcs web editor.png" id="logo"/> -->

  <!-- *********** Template Sections *********** -->
  
  <div id="content" name="" class="container">
      ${createTemplateSections()}          
      <div class="spacer kneeboard-section" style="order: 99"></div>  
    </div>
  </div>
  
  
  <div class="controls no-print accordion" data-html2canvas-ignore>
    
    <!-- *********** Control Buttons *********** -->
    
    <div class="tab">
      <input class="hidden" type="checkbox" checked name="accordion-knb-1" id="knb1">

      <div class="tab__label" style="width: 100%">
        <label for="knb1" style="width: 100%">Settings & Downloads</label>
      </div>
      <div class="tab__content">
        ${createControlButtons()}
      </div>
    </div>


    <!-- *********** Toggle Checkboxes *********** -->

    <hr>
    <div class="kneeboard-sections tab">
      <input class="hidden" type="checkbox" checked name="accordion-knb-2" id="knb2">

      <div class="tab__label" style="width: 100%">
        <label for="knb2" style="width: 100%">Show/Hide Sections</label>
      </div>
      <div class="tab__content">
        ${createToggleCheckboxes()}
      </div>
    </div>
  </div>
  `;
  _root.innerHTML = HTML;
}

function createTemplateSections() {
  return registeredComponents
    .map((component) => {
      if (component.template === false)
        return `<div style="order:100; display: none;" class="no-print" id="${component.id}"></div>`;
      const klass = "kneeboard-section";
      return `<div class="${klass}" id="${component.id}"></div>`;
    })
    .join("\n");
}

function createControlButtons() {
  return registeredComponents.map((component) => component.control).join("\n");
}

function createToggleCheckboxes() {
  return registeredComponents
    .map((component) => {
      const { id, template } = component;
      if (template === false) return "";

      const checked = load("hidden-" + id) ? "" : "checked";

      return `
            <label for="checkbox-${id}">
              <input name="${id}" id="checkbox-${id}" ${checked} type="checkbox" />
              ${_.startCase(id)}
            </label>
          `;
    })
    .join("\n");
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

  const groups = country[category]?.group;

  if (!groups) {
    console.error("no groups found in country", countryName, category, country);
    return;
  }
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

  // load theme
  const storedTheme = load("theme") || DEFAULT_THEME;
  setTimeout(() => switchTheme({ target: { value: storedTheme } }), 10);

  // render all registered components
  setTimeout(
    () => renderRegisteredComponents(registeredComponents, context, options.noControls),
    10
  );
  return refresh;
}

export function refresh(only = null) {
  setTimeout(() => renderRegisteredComponents(registeredComponents, context, true, only), 10);
}
