import { Component, Context } from "..";
import './radio.css';

const component: Component = {
  id: 'radio',
  template: `<p id="radio"></p>`,
  render: (c: Context) => {
    const {unit} = c;
    
    return `<h4 class="center">R A D I O</h4>${
      unit.Radio?.map((radio, n) => {
        return  `<ul>Radio ${n + 1})
          ${
            radio.channels.map((channel, i) => 
            `<li>${channel}${radio.modulation && radio.modulation[i] === 1 ? ' FM' : ' AM'}</li>`).join('')
          }
        </ul>`;
      }).join('<br>') || 'No Channels'
    }`
  },
}

export default component;
