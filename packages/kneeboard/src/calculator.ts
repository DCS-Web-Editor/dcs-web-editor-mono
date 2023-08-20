import { LLtoAll, MS_TO_KMH, MS_TO_KTS, M_TO_FEET, KM_TO_NM, msToKts } from "@dcs-web-editor-mono/utils"
import { load } from './cache';

export const config = {
  coordinates: load('coordinates') || 'DMS',
  system: load('system') || 'IMPERIAL',
}


export function coordinates(latLon) {
  const all = LLtoAll(latLon.lat, latLon.lon)
  return all[config.coordinates];
}

export function speed(ms: number) {
  return config.system === 'IMPERIAL' ?
  MS_TO_KTS * ms : MS_TO_KMH * ms;
}
export function speedUnit() {
  return config.system === 'IMPERIAL' ? 'kts' : 'kmh'
}

export function altitude(m: number) {
  return config.system === 'IMPERIAL' ?
    M_TO_FEET * m : m;
}
export function altitudeUnit() {
  return config.system === 'IMPERIAL' ? 'ft' : 'm'
}

export function distance(km: number) {
  return config.system === 'IMPERIAL' ?
    KM_TO_NM * km : km;
}
export function distanceUnit() {
  return config.system === 'IMPERIAL' ? 'nm' : 'km'
}


export default {
  config,
  coordinates,
  speed,
  speedUnit,
  altitude,
  altitudeUnit,
  distance,
  distanceUnit,
}
