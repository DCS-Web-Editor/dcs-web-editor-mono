import {
  calcDistance,
  calcBearing,
  LatLon,
  isTranslation,
  translate,
  M_TO_NM,
  KM_TO_NM,
  toJsDate,
} from "@dcs-web-editor-mono/utils";
import { mizToLL, activeMap } from "@dcs-web-editor-mono/map-projection";
import _ from "lodash";
import calculator from "../../calculator";

interface Point {
  // original DCS properties
  name?: string;
  ETA: number;
  ETA_locked?: boolean;
  action: string;
  alt: number;
  alt_type: string;
  formation_template?: string;
  speed: number;
  speed_locked: boolean;
  task: any;
  type: string;
  x: number;
  y: number;
  airdromeId?: any;

  // calculated or converted by this script
  coords?: string;
  lat?: number;
  lon?: number;
  altitude?: string;
  maxAltitude?: number;
  heading?: number;
  distance?: number;
  track?: number;
  time?: number;
  cspeed?: number;
}

let track = 0;
let maxAltitude = 0;

export function getWaypoints(group: any, mission: any, dictionary: any, declination: Function) {
  // set map projection
  activeMap(mission.theatre);

  const points = group.route.points;

  let previousPoint: Point;
  track = 0;
  maxAltitude = 0;

  // convert all waypoints
  return points.map((point: Point) => {
    setDefaults(point, dictionary);
    convertCoordinates(point);
    convertTime(point, mission.start_time);
    convertAlt(point);
    convertSpeed(point);
    calculateDistance(point, previousPoint);
    calculateHeading(point, previousPoint, declination, mission.date);

    previousPoint = point;

    const picked = _.pick(point, [
      "name",
      "type",
      "altitude",
      "cspeed",
      "distance",
      "heading",
      "time",
      "coords",
      "lat",
      "lon",
      "x",
      "y",
    ]);

    const values = Object.values(picked);
    // Notes
    values.push(point.type);

    return values;
  });
}

function setDefaults(point: Point, dictionary: any) {
  _.defaults(point, {
    name: "",
    alt: 0,
    speed: 0,
    ETA: 0,
    x: 0,
    y: 0,
    heading: 0,
    distance: 0,
  });

  point.name = isTranslation(point.name as string) ? translate(point.name as string, dictionary) : point.name;
  point.name = point.name || point.action;
}

export function convertCoordinates(point: Point) {
  const latLon = mizToLL(point.y, point.x);
  point.lat = latLon.lat;
  point.lon = latLon.lon;

  const coords = calculator.coordinates(latLon);
  point.coords = coords;
  return point;
}

function convertTime(point: Point, start_time: number) {
  const s = Math.round(point.ETA + start_time) * 1000 + 1;
  point.time = new Date(s).toISOString().split("T")[1].slice(0, 8);
}

function convertAlt(point: Point) {
  const alt = Math.round(calculator.altitude(point.alt));
  point.maxAltitude = maxAltitude = alt > maxAltitude ? alt : maxAltitude;
  point.altitude = alt + (point.alt_type === "BARO" ? " MSL" : " AGL");
}

function convertSpeed(point: Point) {
  const cspeed = Math.round(calculator.speed(point.speed));
  point.cspeed = cspeed;
}

function calculateDistance(point: Point, prevPoint: Point) {
  if (!prevPoint) {
    point.distance = 0;
    point.track = 0;
    return;
  }
  const nm = calcDistance(point as LatLon, prevPoint as LatLon); // nm
  const distance = calculator.distance(nm / KM_TO_NM);
  point.distance = distance;
  track += distance;
  point.track = track;
}

function calculateHeading(point: Point, prevPoint: Point, declination: Function, missionDate: any) {
  if (!prevPoint) return;
  const date = toJsDate(missionDate, 0);
  const dec = Math.round(declination(prevPoint.lat, prevPoint.lon, 0, date));

  point.heading = calcBearing(prevPoint as LatLon, point as LatLon) + dec; // nm
}

export const SELECTED_CLASS = "selected";
export const ODD_ROW_CLASS = "odd";
