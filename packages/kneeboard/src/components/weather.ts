import {toFahrenheit} from '@dcs-web-editor-mono/utils'

import { Component, Context } from "..";
import './weather.css';
import calculator, { pressureUnit } from '../calculator';

const component: Component = {
  id: 'weather',

  render: (c: Context) => {
    const {weather} = c.mission;
    const title = `<h4 class="center">WEATHER</h4>`;
    const visibility = Math.round(calculator.distance(weather.visibility.distance / 1000)).toLocaleString();
    const base = calculator.altitude(weather.clouds.base).toFixed(0);
    const thickness = calculator.altitude(weather.clouds.thickness).toFixed(0);
    const k2 = calculator.config.system === 'IMPERIAL' ? 'FL65' : '2km'
    const k8 = calculator.config.system === 'IMPERIAL' ? 'FL260' : '8km'
    const sunit = calculator.speedUnit();
    const aunit = calculator.altitudeUnit();
    const dunit = calculator.distanceUnit();

    const pressure = calculator.pressure(weather.qnh).toFixed(2);
    const pressureUnit = calculator.pressureUnit();

    const gndSpd = calculator.speed(weather.wind?.atGround?.speed).toFixed(0) + sunit;
    const k2Spd = calculator.speed(weather.wind?.at2000?.speed).toFixed(0) + sunit;
    const k8Spd = calculator.speed(weather.wind?.at8000?.speed).toFixed(0) + sunit;

    const gndDir = weather.wind?.atGround?.dir.toFixed(0);
    const k2Dir = weather.wind?.at2000?.dir.toFixed(0);
    const k8Dir = weather.wind?.at8000?.dir.toFixed(0);
    return title + `<span class="label">QNH</span> ${pressure}${pressureUnit} <span class="label">TEMP</span> ${weather.season.temperature.toFixed(1)}°C ${toFahrenheit(weather.season.temperature).toFixed(1)}°F <span class="label">VISIBILITY</span> ${visibility + dunit} <span class="label">CLOUD</span> <span class="label">BASE</span> <span class="value">${base + aunit}</span> <span class="label">THICKNESS</span> ${thickness + aunit}
<span class="label">WIND</span> <span class="label">GND</span> ${gndDir}/${gndSpd} <span class="label">${k2}</span> ${k2Dir}/${k2Spd} <span class="label">${k8}</span> ${k8Dir}/${k8Spd}`
  },
}

export default component;