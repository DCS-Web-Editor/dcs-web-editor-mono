import { Component, Context } from "..";
import './loadout.css';

const component: Component = {
  id: 'loadout',

  template: `<div id="loadout"><h4 class="center">L O A D O U T</h4><div id="loadout-content"></div></div>`,

  render: (c: Context) => {
    const {unit} = c;
    if (!unit.payload) return '';
    
    return `<b>FUEL</b> ${unit.payload.fuel}kg <b>CHAFF</b> ${unit.payload.chaff} <b>FLARES</b> ${unit.payload.flare} <b>GUN</b> ${unit.payload.gun}%
    
    <ul>${
      unit.payload.pylons?.map((pylon, i) => {
        if (!pylon) return `<li>---</li>`;
        const weapon = window.JSON_DATA.Weapons.find(w => w.CLSID === pylon.CLSID);
        return `<li>${weapon?.displayName || '???'}</li>`;
      }).join('\n')
    }
    </ul>`
  },
}

export default component;

