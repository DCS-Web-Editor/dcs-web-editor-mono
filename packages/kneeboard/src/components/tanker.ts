import { Component, Context } from "..";
import './tanker.css'
const component: Component = {
  id: 'tanker',
  template: `<div id="tanker">
  <h4 class="center">T A N K E R</h4>
  </div>`,
  render: (c: Context) => {
    const {country} = c;
    const tankers = `<ul>${country.plane?.group.map((group) => {
      if (group.task === 'Refueling') {

        const tasks = group.route?.points?.flatMap(p => p.task.params?.tasks?.filter(t => t.id === 'WrappedAction' )).filter(t => t.params?.action?.id === 'ActivateBeacon').map(t =>  t.params?.action?.params)
        const task = tasks[0] || {};
        // console.log(task);

        const unit = group.units[0];
        
        const callsign = unit.callsign?.name || unit.callsign;
        return `<li><span class="callsign">${callsign}</span> <b>${group.name}</b> <span class="type">${unit.type}</span> <span class="freq">${group.frequency}</span> <span class="tacan">TACAN ${task.callsign} ${task.channel} ${task.modeChannel}</span></li>`
      }
      else return false;
    }).filter(i => i).join('') || 'No tanker available'}</ul>`;
    
    return tankers;
  },
}

export default component;
