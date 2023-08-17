
// const unitName = 'Viper-1-1';
// const groupName = 'Viper-1';
// const countryName = 'CJTF Blue';
import mission from './examples/F15 bomber intercept/mission.json'
import dictionary from './examples/F15 bomber intercept/dictionary.json'
import { createBriefing, HTML } from '.';
document.body.innerHTML = HTML;

const unitName = 'F-15C Intercept 1-1 (Player)';
const groupName = 'F-15C Intercept 1';
const countryName = 'USA';
const coalitionName = 'blue';


createBriefing(unitName, groupName, countryName, coalitionName, mission, dictionary);