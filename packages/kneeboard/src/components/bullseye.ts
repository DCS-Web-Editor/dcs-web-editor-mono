
import { convertCoordinates } from "./waypoints/waypointConverter";

import { Component, Context } from "..";
import { activeMap } from "@dcs-web-editor-mono/map-projection";

const component: Component = {
  id: 'bullseye',
  template: `<p id="bullseye"></p>`,
  render: (c: Context) => {
    const {coalition, mission} = c;
    
    // set map for projection
    activeMap(mission.theatre);

    const bullseye = coalition.bullseye;
    const coords = convertCoordinates(bullseye);
    return `<b>BULLSEYE</b> LAT: ${coords.lat?.toFixed(4)} LON: ${coords.lon?.toFixed(4)}`
  },
}

export default component;

