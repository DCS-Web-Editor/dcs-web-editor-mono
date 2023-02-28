// npm run tsc -- ./src/mergeNevada.ts --resolveJsonModule --esModuleInterop && node mergeNevada.js > NevadaMerged.json
import missionAirports from './airbase_mission_Nevada.json' assert { type: "json" };
import guiAirports from './airbase_gui_Nevada.json'assert { type: "json" };
import { enhanceProperties } from './merge.mjs';
missionAirports.forEach(airport => {
    enhanceProperties(guiAirports, airport, 'Nevada');
    // else console.log('not found', airport.properties.name);
});
console.log(JSON.stringify(missionAirports, null, 2));
