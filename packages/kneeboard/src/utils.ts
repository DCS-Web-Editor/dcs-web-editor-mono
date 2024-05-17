import { _checked } from "./components/friendlies";

export function sortGroup(a: any, b: any) {
  const unitA = a.units[0];
  const unitB = b.units[0];
  const callsignA = (unitA.callsign?.name || unitA.callsign)?.toString()?.slice(0, -1);
  const callsignB = (unitB.callsign?.name || unitB.callsign)?.toString()?.slice(0, -1);

  const toSortA = _checked ? a.name : callsignA;
  const toSortB = _checked ? b.name : callsignB;

  const sortA = toSortA.toUpperCase(); // ignore upper and lowercase
  const sortB = toSortB.toUpperCase(); // ignore upper and lowercase

  if (sortA < sortB) {
    return -1;
  }
  if (sortA > sortB) {
    return 1;
  }

  // names must be equal
  return 0;
}
