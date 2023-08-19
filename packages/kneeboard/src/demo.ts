
import missionF15 from './examples/F15 bomber intercept/mission.json'
import dictionaryF15 from './examples/F15 bomber intercept/dictionary.json'

import missionSead from './examples/sead/mission.json'
import dictionarySead from './examples/sead/dictionary.json'

import missionApache from './examples/apache hunting grounds/mission.json'
import dictionaryApache from './examples/apache hunting grounds/dictionary.json'

import missionSidra from './examples/gulf of sidra/mission.json'
import dictionarySidra from './examples/gulf of sidra/dictionary.json'

import missionKhameni from './examples/khameni/mission.json'
import dictionaryKhameni from './examples/khameni/dictionary.json'


import { generateKneeboard, getHTML } from '.';
import './database'
document.querySelector('.kneeboard').innerHTML = getHTML();


const DEMOS = {
  F15: {
    mission: missionF15,
    dictionary: dictionaryF15,
    unitName: 'F-15C Intercept 1-1 (Player)',
    groupName: 'F-15C Intercept 1',
    countryName: 'USA',
    coalitionName: 'blue',
    category: 'plane',
  },
  Sead: {
    mission: missionSead,
    dictionary: dictionarySead,
    unitName: 'Viper-1-1',
    groupName: 'Viper-1',
    countryName: 'CJTF Blue',
    coalitionName: 'blue',
    category: 'plane',
  },
  UH60: {
    mission: missionApache,
    dictionary: dictionaryApache,
    unitName: '1-08-1',
    groupName: '1-08',
    countryName: 'USA',
    coalitionName: 'blue',
    category: 'helicopter',
  },
  Apache: {
    mission: missionApache,
    dictionary: dictionaryApache,
    unitName: 'Marauder London',
    groupName: 'Marauder London (cold)',
    countryName: 'USA',
    coalitionName: 'blue',
    category: 'helicopter',
  },
  F14A: {
    mission: missionApache,
    dictionary: dictionaryApache,
    unitName: 'Nickel-3',
    groupName: 'Nickel',
    countryName: 'USA',
    coalitionName: 'blue',
    category: 'plane',
  },
  AWACS: {
    mission: missionSidra,
    dictionary: dictionarySidra,
    unitName: 'AWACS',
    groupName: 'AWACS',
    countryName: 'USA',
    coalitionName: 'blue',
    category: 'plane',
  },
  VF14: {
    mission: missionSidra,
    dictionary: dictionarySidra,
    unitName: 'VF-14 Gypsy-1-2',
    groupName: 'VF-14 Gypsy-1',
    countryName: 'USA',
    coalitionName: 'blue',
    category: 'plane',
  },
  VF32: {
    mission: missionSidra,
    dictionary: dictionarySidra,
    unitName: 'VF-32 Gypsy-202',
    groupName: 'VF-32 Gypsy-2',
    countryName: 'USA',
    coalitionName: 'blue',
    category: 'plane',
  },
  FA18: {
    mission: missionKhameni,
    dictionary: dictionaryKhameni,
    unitName: 'Aerial-30-4',
    groupName: 'Aerial-30',
    countryName: 'USA',
    coalitionName: 'blue',
    category: 'plane',
  },
}


let demo = DEMOS.VF14;
generateKneeboard(demo.unitName, demo.groupName, demo.category, demo.countryName, demo.coalitionName, demo.mission, demo.dictionary);

const demoSelect = document.getElementById('demo-select')!;

demoSelect?.addEventListener('change', () => {
  let demo = DEMOS[demoSelect.value];
  
  // Re-render
  document.querySelector('.kneeboard')!.innerHTML = getHTML();  
  
  generateKneeboard(demo.unitName, demo.groupName, demo.category, demo.countryName, demo.coalitionName, demo.mission, demo.dictionary);
})

