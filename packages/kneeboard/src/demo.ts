
import mission1 from './examples/F15 bomber intercept/mission.json'
import dictionary1 from './examples/F15 bomber intercept/dictionary.json'

import mission2 from './examples/sead/mission.json'
import dictionary2 from './examples/sead/dictionary.json'

import mission3 from './examples/apache hunting grounds/mission.json'
import dictionary3 from './examples/apache hunting grounds/dictionary.json'

import mission4 from './examples/operation/mission.json'

import { generateKneeboard, getHTML } from '.';
import './database'
document.querySelector('.kneeboard').innerHTML = getHTML();


const DEMOS = {
  F15: {
    mission: mission1,
    dictionary: dictionary1,
    unitName: 'F-15C Intercept 1-1 (Player)',
    groupName: 'F-15C Intercept 1',
    countryName: 'USA',
    coalitionName: 'blue',
    category: 'plane',
  },
  Sead: {
    mission: mission2,
    dictionary: dictionary2,
    unitName: 'Viper-1-1',
    groupName: 'Viper-1',
    countryName: 'CJTF Blue',
    coalitionName: 'blue',
    category: 'plane',
  },
  UH60: {
    mission: mission3,
    dictionary: dictionary3,
    unitName: '1-08-1',
    groupName: '1-08',
    countryName: 'USA',
    coalitionName: 'blue',
    category: 'helicopter',
  },
  Apache: {
    mission: mission3,
    dictionary: dictionary3,
    unitName: 'Marauder London',
    groupName: 'Marauder London (cold)',
    countryName: 'USA',
    coalitionName: 'blue',
    category: 'helicopter',
  },
  F14A: {
    mission: mission3,
    dictionary: dictionary3,
    unitName: 'Nickel-3',
    groupName: 'Nickel',
    countryName: 'USA',
    coalitionName: 'blue',
    category: 'plane',
  },
}


let demo = DEMOS.Apache;
generateKneeboard(demo.unitName, demo.groupName, demo.category, demo.countryName, demo.coalitionName, demo.mission, demo.dictionary);

const demoSelect = document.getElementById('demo-select');

demoSelect?.addEventListener('change', () => {
  let demo = DEMOS[demoSelect.value];
  document.querySelector('.kneeboard').innerHTML = getHTML();  
  generateKneeboard(demo.unitName, demo.groupName, demo.category, demo.countryName, demo.coalitionName, demo.mission, demo.dictionary);
})

