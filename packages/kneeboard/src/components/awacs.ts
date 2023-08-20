import { translate } from "@dcs-web-editor-mono/utils";
import { Component, Context } from "..";
import './awacs.css'
const component: Component = {
  id: 'awacs',
  render: (c: Context) => {
    const {country, dictionary} = c;
    const title = `<h4 class="center">A W A C S</h4>`;
    const awacs = `<ul>${country.plane?.group.map((group) => {
      if (group.task === 'AWACS') {
        
        const unit = group.units[0];
        // console.log(group);
        
        const callsign = unit.callsign?.name || unit.callsign;
        return `<li><span class="callsign">${callsign}</span> <b>${translate(group.name, dictionary)}</b> <span class="type">${unit.type}</span> <span class="freq">${group.frequency}</span></li>`
      }
      else return false;
    }).filter(i => i).join('') || 'No AWACS support'}</ul>`;
    
    return title + awacs;
  },
}

export default component;
