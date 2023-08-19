import { Component, Context } from "..";
import './friendlies.css'
const component: Component = {
  id: 'friendlies',
  template: `<p id="friendlies"></p>`,
  render: (c: Context) => {
    const {country} = c;
    // console.log(country);
    const title = '<b>FRIENDLIES</b><br>';
    const planes = `<span class="icon">🛦</span> <ul>${country.plane?.group.map((group) => `<li><span class="task">${group.task}</span> <b>${group.name}</b> <span class="freq">${group.frequency}</span></li>`).join('') || ''}</ul>`;
    const rotary = country.helicopter ? `<span class="icon">⊗</span> <ul>${country.helicopter?.group.map((group) => `<li><span class="task">${group.task}</span> <b>${group.name}</b> <span class="freq">${group.frequency}</span></li>`).join('') || ''}</ul>` : '';
    
    return title + planes + rotary;
  },
}

export default component;
