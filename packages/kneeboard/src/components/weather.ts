import {toFahrenheit} from '@dcs-web-editor-mono/utils'

import { Component, Context } from "..";
import './weather.css';
import calculator from '../calculator';

const component: Component = {
  id: 'weather',

  render: (c: Context) => {
    const {weather} = c.mission;
    const title = `<h4 class="center">W E A T H E R</h4>`;
    const visibility = Math.round(calculator.distance(weather.visibility.distance / 1000)).toLocaleString();
    const base = calculator.altitude(weather.clouds.base).toFixed(0);
    const thickness = calculator.altitude(weather.clouds.thickness).toFixed(0);
    const k2 = calculator.altitude(2000);
    const k8 = calculator.altitude(8000);
    const sunit = calculator.speedUnit();
    const aunit = calculator.altitudeUnit();
    const dunit = calculator.distanceUnit();

    const gndSpd = calculator.speed(weather.wind?.atGround?.speed).toFixed(0) + sunit;
    const k2Spd = calculator.speed(weather.wind?.at2000?.speed).toFixed(0) + sunit;
    const k8Spd = calculator.speed(weather.wind?.at8000?.speed).toFixed(0) + sunit;

    return title + `QNH: ${weather.qnh} TEMP: ${weather.season.temperature.toFixed(1)}° ${toFahrenheit(weather.season.temperature).toFixed(1)}F VISIBILITY: ${visibility + dunit}
<b>CLOUD</b> BASE ${base + aunit} THICKNESS ${thickness + aunit}
<b>WIND GND</b> ${weather.wind?.atGround?.dir.toFixed(0)} / ${gndSpd} <b>WIND 2km</b> ${weather.wind?.at2000?.dir.toFixed(0)} / ${k2Spd} <b>WIND 8km</b> ${weather.wind?.at8000?.dir.toFixed(0)} / ${k8Spd}
    `
  },
}

export default component;