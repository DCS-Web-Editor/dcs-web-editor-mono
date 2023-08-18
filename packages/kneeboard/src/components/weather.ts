import { Component, Context } from "..";
import './weather.css';

const component: Component = {
  id: 'weather',

  template: `<div id="weather"><h4 class="center">W E A T H E R</h4></div>`,

  render: (c: Context) => {
    const {weather} = c.mission;

    return `QNH: ${weather.qnh} TEMP: ${weather.season.temperature}° ${(weather.season.temperature * 9 / 5) + 32}F VISIBILITY: ${weather.visibility.distance}m
    CLOUD BASE: ${weather.clouds.base}m THICKNESS: ${weather.clouds.thickness}
    <b>WIND GND</b> ${weather.wind?.atGround?.dir} / ${weather.wind?.atGround?.speed} <b>WIND 2k</b> ${weather.wind?.at2000?.dir} / ${weather.wind?.at2000?.speed} <b>WIND 8k</b> ${weather.wind?.at8000?.dir} / ${weather.wind?.at8000?.speed}
    `
  },
}

export default component;