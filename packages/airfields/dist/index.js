import caucasus from './caucasus.json';
import syria from './syria.json';
import marianas from './marianas.json';
import nevada from './nevada.json';
import persian_gulf from './persian_gulf.json';
// airports json is an object for some reason
const caucasusToArray = [];
Object.values(caucasus).forEach(airport => {
    caucasusToArray.push(airport);
});
const toExport = {
    Caucasus: caucasusToArray,
    Syria: syria,
    MarianaIslands: marianas,
    Nevada: nevada,
    PersianGulf: persian_gulf,
};
export default toExport;
