// npm run tsc -- ./src/mergeSyria.ts --resolveJsonModule --esModuleInterop && node mergeSyria.js > syriaMerged.json
import missionAirports from './airbase_mission_Syria.json'assert { type: "json" };
import guiAirports from './airbase_gui_Syria.json'assert { type: "json" };
import { enhanceProperties } from './merge.mjs';
missionAirports.forEach(airport => {
    enhanceProperties(guiAirports, airport, 'Syria');
    // else console.log('not found', airport.properties.name);
});
console.log(JSON.stringify(missionAirports, null, 2));
