// npm run tsc -- ./src/mergeCaucasus.ts --resolveJsonModule --esModuleInterop && node mergeCaucasus.js > caucasusMerged.json
import missionAirports from './airbase_mission_Caucasus.json'assert { type: "json" };
import guiAirports from './airbase_gui_Caucasus.json'assert { type: "json" };
import { enhanceProperties } from './merge.mjs';
const caucasusToArray = [];
Object.values(guiAirports).forEach(airport => {
    caucasusToArray.push(airport);
});
missionAirports.forEach(airport => {
    enhanceProperties(caucasusToArray, airport, 'Caucasus');
    // else console.log('not found', airport.properties.name);
});
console.log(JSON.stringify(missionAirports, null, 2));
