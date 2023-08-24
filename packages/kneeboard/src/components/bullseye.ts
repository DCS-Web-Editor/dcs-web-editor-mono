
import { convertCoordinates } from "./waypoints/waypointConverter";

import { Component, Context } from "..";
import { activeMap } from "@dcs-web-editor-mono/map-projection";
import calculator from "../calculator";

const component: Component = {
  id: 'bullseye',
  render: (c: Context) => {
    const {coalition, mission} = c;
    
    // set map for projection
    activeMap(mission.theatre);

    const bullseye = coalition.bullseye;
    const latLon = convertCoordinates(bullseye);
    const coords = calculator.coordinates(latLon)
    return `<h4 class="center">BULLSEYE</h4> ${coords}`
  },
}

export default component;

