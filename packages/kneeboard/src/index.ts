
import _ from 'lodash';


export interface Component {
  template: string,
  render: (c: Context) => string,
  id: string,
  control?: string,
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

import screenshot from './components/controls/screenshot';
import metricSelect from './components/controls/metricSelect';
import coordinateSelect from './components/controls/coordinateSelect';

import date from './components/date';
import title from './components/title';
import mainTask from './components/mainTask';
import coalitionTask from './components/coalitionTask';
import bullseye from './components/bullseye';
import group from './components/group';
import unit from './components/unit';
import weather from './components/weather';
import loadout from './components/loadout';
import waypoints from './components/waypoints/waypoints';
import waypointProfile from './components/waypointProfile';
import notes from './components/notes';



const registeredComponents: Component[] = [];

export function register(...components:Component[]) {
  registeredComponents.push(...components);
}


(function init() {
  register(
    // controls
    metricSelect,
    coordinateSelect,
    screenshot,
    // components
    date,
    title,
    mainTask,
    coalitionTask,
    bullseye,
    group,
    unit,
    weather,
    loadout,
    waypoints,
    waypointProfile,
    notes,
  )
})();


export function getHTML() {
  return `
  <div id="capture">
    <div id="content">
      <span id="dwv-info">D C S &nbsp; W E B &nbsp; E D I T O R</span>
      ${
        // Add component templates
        registeredComponents.map(component => component.template).join('\n')
      }          
    </div>
  </div>
  
  <div class="controls">
  
    ${
      // Add control buttons
      registeredComponents.map(component => component.control).join('\n')
    }

    ${
      // Add control checkbox toggles
      registeredComponents.map(component => {
        const { id, template} = component;
        if (!template) return '';
        
        return `
          <label for="checkbox-${id}">
            <input name="${id}" id="checkbox-${id}" checked="true" type="checkbox" />
            ${_.startCase(id)}
          </label>
        `
      }).join('\n')
    }

  </div>
  `
}


export function generateKneeboard(unitName: string, groupName: string, category: string, countryName: string, coalitionName: string, mission: any, dictionary: any) {

  const coalition = mission.coalition[coalitionName]
  const countries = coalition.country;
  const country = countries.find(c => c.name === countryName)!;
  const groups = country[category].group;
  const group = groups.find(g => g.name === groupName)!;
  const unit = group.units.find(u => u.name === unitName);
  
  
  const context: Context = {
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
  }

  // render all registered components
  renderRegisteredComponents(context);
}

function renderRegisteredComponents(context: Context) {
  registeredComponents.forEach(component => {
    render(component.id, component.render(context));

    if (component.template) {
      const toggle = document.querySelector(`input[name="${component.id}"]`)!;
      toggle?.addEventListener('change', toggleHandler);
    }
  });
}

function toggleHandler(e:InputEvent) {
  const { name, checked } = e.target;
  const section = document.getElementById(name)!;

  if (checked) section.classList.remove('hidden');
  else section.classList.add('hidden');
}

function render(id: string, value: string) {
  document.getElementById(id)!.innerHTML += value;
}


