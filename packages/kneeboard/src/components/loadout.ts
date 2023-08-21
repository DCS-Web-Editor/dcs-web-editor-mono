import { Component, Context } from "..";
import './loadout.css';

const component: Component = {
  id: 'loadout',

  render: (c: Context) => {
    const {unit} = c;
    const title = `<h4 class="center">L O A D O U T</h4>`;
    if (!unit.payload) return title;

    return title + `<span class="label">FUEL</span> ${unit.payload.fuel}kg <span class="label">CHAFF</span> ${unit.payload.chaff} <span class="label">FLARES</span> ${unit.payload.flare} <span class="label">GUN</span> ${unit.payload.gun}%
    
    <ul>${
      unit.payload.pylons?.map((pylon, i) => {
        if (!pylon) return `<li>---</li>`;
        console.log(pylon);
        
        const weapon = window.JSON_DATA.Weapons.find(w => w.CLSID === pylon.CLSID);
        return `<li>${weapon?.displayName || '???'}</li>`;
      }).join('\n')
    }
    </ul>`
  },
}

export default component;

