import { calcDistance, calcBearing, LatLon, isTranslation, translate, M_TO_NM, KM_TO_NM } from '@dcs-web-editor-mono/utils'
import { mizToLL, activeMap } from '@dcs-web-editor-mono/map-projection'
import _ from 'lodash';
import calculator from '../../calculator';

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
  speed_locked: boolean; task: any
  type: string;
  x: number;
  y: number;
  airdromeId?: any;
  
  // calculated or converted by this script
  coords?: string;
  lat?: number;
  lon?: number;
  altitude?: string;
  heading?: number;
  distance?: number;
  time?: number;
  cspeed?: number;
}

export function getWaypoints(group: any, mission: any, dictionary: any) {
  
  // set map projection
  activeMap(mission.theatre);

  const points = group.route.points;

  let previousPoint: Point;
  
  // convert all waypoints
  return points.map((point: Point) => {
    setDefaults(point, dictionary);
    convertCoordinates(point);
    convertTime(point, mission.start_time);
    convertAlt(point);
    convertSpeed(point);
    calculateDistance(point, previousPoint);
    calculateHeading(point, previousPoint);
  
    previousPoint = point;

    const picked = _.pick(point, ['name', 'type', 'altitude', 'cspeed', 'distance', 'heading', 'time', 'coords', 'lat', 'lon', 'x', 'y'])

    const values = Object.values(picked);
    // Notes
    values.push(point.type);

    return values;
  });
}

function setDefaults(point: Point, dictionary: any) {
  
  _.defaults(point, {
    name: '',
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
  point.time = Math.round(point.ETA * 1000) + (start_time * 1000) + 1;
}

function convertAlt(point: Point) {
  const alt = Math.round(calculator.altitude(point.alt));
  point.altitude = alt + (point.alt_type === 'BARO' ? ' MSL' : ' AGL');
}

function convertSpeed(point: Point) {
  const cspeed = Math.round(calculator.speed(point.speed));
  point.cspeed = cspeed;
}

function calculateDistance(point: Point, prevPoint:Point) {
  if (!prevPoint) return;
  const nm = calcDistance(point as LatLon, prevPoint as LatLon); // nm
  const distances = calculator.distance(nm / KM_TO_NM);
  point.distance = distances;
}

function calculateHeading(point: Point, prevPoint:Point) {
  if (!prevPoint) return;
  point.heading = calcBearing(prevPoint as LatLon, point as LatLon); // nm
}


export const SELECTED_CLASS = "selected";
export const ODD_ROW_CLASS = "odd";
