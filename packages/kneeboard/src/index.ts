
import _ from 'lodash';

import html2canvas from "html2canvas";


import { getWaypoints } from "./converter";
import { translate } from '@dcs-web-editor-mono/utils'
import { createWaypointTable } from "./waypoints";

const toggles = ['title', 'main-task', 'coalition-task', 'group', 'unit', 'weather',  'loadout', 'waypoints', 'notes'];

export const HTML = `
<script src="https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js"></script>

<div id="capture">
  <div id="content">
    <span id="date"></span>
    <span id="dwv-info">D C S &nbsp; W E B &nbsp; E D I T O R</span>
    <h2 id="title" class="center"></h2>
    <p id="main-task">BRIEFING: </p>
    <p id="coalition-task"></p>
    <p id="group"></p>
    <p id="unit"></p>

    <div id="weather"><h4 class="center">W E A T H E R</h4></div>
    
    <div id="loadout"><h4 class="center">L O A D O U T</h4><div id="loadout-content"></div></div>

    <div id="waypoints">
      <h4 class="center">W A Y P O I N T S</h4>
      <div id="waypoints-table"></div>
    </div>
    
    <div id="notes">
      <h4 class="center">N O T E S</h4>
      <textarea></textarea>
    </div>
    
  </div>
</div>

<div class="controls">
  <button id="export-file">Waypoints .csv</button>
  <button id="screenshot">Download PNG</button>
  <select name="metricSelect" id="">
    <option value="metric">metric</option>
    <option value="imperial" disabled="true">imperial</option>
  </select>
  <select name="coordinateSelect" id="">
    <option value="dd">DD</option>
    <option value="ddm" disabled="true">DMM</option>
    <option value="mgrs" disabled="true">MGRS</option>
  </select>
  <p>
  ${
    toggles.map(toggle => {
      return `
      <label for="checkbox-${toggle}">
        <input name="${toggle}" id="checkbox-${toggle}" checked="true" type="checkbox" />
        ${_.startCase(toggle)}
      </label>
      `
    }).join('')
  }
  </p>
</div>
`

export function createBriefing(unitName: string, groupName: string, category: string, countryName: string, coalitionName: string, mission: any, dictionary: any) {


  const countries = mission.coalition[coalitionName].country;
  const country = countries.find(c => c.name === countryName)!;
  const groups = country[category].group;
  const group = groups.find(g => g.name === groupName)!;
  const unit = group.units.find(u => u.name === unitName);
  
  
  const data = getWaypoints(group, mission, dictionary);
  const { weather } = mission;
  // console.log(weather);
  // console.log(dictionary);
  

  change('#title', translate(mission.sortie, dictionary) || 'BRIEFING');

  change('#main-task', translate(mission.descriptionText, dictionary));

  const taskName = `description${_.startCase(coalitionName)}Task`
  change('#coalition-task', `${_.upperCase(coalitionName)} TASK:  ${translate(mission[taskName], dictionary)}`);

  change('#date', `${mission.date.Month}/${mission.date.Day}/${mission.date.Year}`);

  change('#group', `GROUP: ${groupName} FREQ: ${group?.frequency} TASK: ${group?.task}`);

  change('#unit', `UNIT: ${unitName} ${unit?.type} CALLSIGN: ${unit?.callsign?.name || unit.callsign}`);

  change('#weather',
`QNH: ${weather.qnh} TEMP: ${weather.season.temperature}° ${(weather.season.temperature * 9 / 5) + 32}F VISIBILITY: ${weather.visibility.distance}m
CLOUD BASE: ${weather.clouds.base}m THICKNESS: ${weather.clouds.thickness}
<b>WIND GND</b> ${weather.wind?.atGround?.dir} / ${weather.wind?.atGround?.speed} <b>WIND 2k</b> ${weather.wind?.at2000?.dir} / ${weather.wind?.at2000?.speed} <b>WIND 8k</b> ${weather.wind?.at8000?.dir} / ${weather.wind?.at8000?.speed}
`);

// console.log(unit.payload);

  if (unit.payload) change('#loadout',
  `<b>FUEL</b> ${unit.payload.fuel}kg <b>CHAFF</b> ${unit.payload.chaff} <b>FLARES</b> ${unit.payload.flare} <b>GUN</b> ${unit.payload.gun}%

<ul>${
  unit.payload.pylons?.map((pylon, i) => {
    if(!pylon) return `<li>${i + 1}.</li>`;
    const weapon = window.JSON_DATA.Weapons.find(w => w.CLSID === pylon.CLSID);
    return `<li>${i + 1}. ${weapon.displayName}</li>`;
  }).join('\n')
  }
</ul>`)

  createWaypointTable(data, 'waypoints-table');
  
  const screenshotButton = document.querySelector("#screenshot")!;
  
  screenshotButton.addEventListener('click', () => {
    const capture = document.querySelector("#capture")!;
    html2canvas(capture).then(canvas => {
      canvas.toBlob(blob => window.open(URL.createObjectURL(blob), '_blank'));
    });
  });

  toggles.forEach((name) => {
    const toggle = document.querySelector(`input[name="${name}"]`)!;
    if (!toggle) return;
    toggle.addEventListener('change', toggleHandler);
  });

}

function toggleHandler(e:InputEvent) {
  const {name, checked} = e.target;
  // console.log('e', checked, name);
  const section = document.getElementById(name)!;
  if (checked) section.classList.remove('hidden');
  else section.classList.add('hidden');
}

function change(id: string, value: string) {
  document.querySelector(id)!.innerHTML += value;
}




