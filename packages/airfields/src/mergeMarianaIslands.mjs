// npm run tsc -- ./src/mergeMarianaIslands.ts --resolveJsonModule --esModuleInterop && node mergeMarianaIslands.js > marianaIslandsMerged.json
import missionAirports from './airbase_mission_MarianaIslands.json'assert { type: "json" };
import guiAirports from './airbase_gui_MarianaIslands.json'assert { type: "json" };
import { enhanceProperties } from './merge.mjs';
missionAirports.forEach(airport => {
    enhanceProperties(guiAirports, airport, 'MarianaIslands');
    // else console.log('not found', airport.properties.name);
});
console.log(JSON.stringify(missionAirports, null, 2));
