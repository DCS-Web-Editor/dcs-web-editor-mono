
// const unitName = 'Viper-1-1';
// const groupName = 'Viper-1';
// const countryName = 'CJTF Blue';
import mission from './examples/F15 bomber intercept/mission.json'
import dictionary from './examples/F15 bomber intercept/dictionary.json'
import { createBriefing, HTML } from '.';
import './database'
document.body.innerHTML = HTML;

const unitName = 'F-15C Intercept 1-1 (Player)';
const groupName = 'F-15C Intercept 1';
const countryName = 'USA';
const coalitionName = 'blue';
const category = 'plane';


createBriefing(unitName, groupName, category, countryName, coalitionName, mission, dictionary);