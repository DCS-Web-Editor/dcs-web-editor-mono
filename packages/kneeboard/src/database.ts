import axios from 'axios';
// const UnitPlanes = (await axios.get('UnitPlanes.json')).data;
// const UnitHelicopters = (await axios.get('UnitHelicopters.json')).data;
// const UnitCars = (await axios.get('UnitCars.json')).data;
// const UnitShips = (await axios.get('UnitShips.json')).data;
const Weapons = (await axios.get('Weapons.json')).data;
// const UnitFortifications = (await axios.get('UnitFortifications.json')).data;
// const UnitCargo = (await axios.get('UnitCargo.json')).data;
// const UnitWarehouses = (await axios.get('UnitWarehouses.json')).data;
// const UnitCarsMod = (await axios.get('UnitCarsMod.json')).data;
// const UnitPlanesMod = (await axios.get('UnitPlanesMod.json')).data;
// const UnitHelicoptersMod = (await axios.get('UnitHelicoptersMod.json')).data;
// const AllPlanes = UnitPlanes.concat(UnitPlanesMod);
// const AllCars = UnitCars.concat(UnitCarsMod);
// const AllHelos = UnitHelicopters.concat(UnitHelicoptersMod);

window.JSON_DATA = {
  Weapons,
  // AllPlanes, AllCars, AllHelos, UnitPlanes, UnitHelicopters, UnitCars, UnitShips, Weapons, UnitFortifications, UnitCargo, UnitWarehouses, UnitCarsMod, UnitPlanesMod, UnitHelicoptersMod
}