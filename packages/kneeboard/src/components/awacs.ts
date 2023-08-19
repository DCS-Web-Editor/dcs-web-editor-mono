import { Component, Context } from "..";
import './awacs.css'
const component: Component = {
  id: 'awacs',
  template: `<div id="awacs">
  <h4 class="center">A W A C S</h4>
  </div>`,
  render: (c: Context) => {
    const {country} = c;
    const awacs = `<ul>${country.plane?.group.map((group) => {
      if (group.task === 'AWACS') {
        
        const unit = group.units[0];
        // console.log(group);
        
        const callsign = unit.callsign?.name || unit.callsign;
        return `<li><span class="callsign">${callsign}</span> <b>${group.name}</b> <span class="type">${unit.type}</span> <span class="freq">${group.frequency}</span></li>`
      }
      else return false;
    }).filter(i => i).join('') || 'No AWACS support'}</ul>`;
    
    return awacs;
  },
}

export default component;
