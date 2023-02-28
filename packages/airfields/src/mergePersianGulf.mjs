// npm run tsc -- ./src/mergePersianGulf.ts --resolveJsonModule --esModuleInterop && node mergePersianGulf.js > PersianGulfMerged.json
import missionAirports from './airbase_mission_PersianGulf.json'assert { type: "json" };
import guiAirports from './airbase_gui_PersianGulf.json'assert { type: "json" };
import { enhanceProperties } from './merge.mjs';
missionAirports.forEach(airport => {
    enhanceProperties(guiAirports, airport, 'PersianGulf');
    // else console.log('not found', airport.properties.name);
});
console.log(JSON.stringify(missionAirports, null, 2));
