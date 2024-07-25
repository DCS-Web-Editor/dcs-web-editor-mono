import {
  LLtoAll,
  MS_TO_KMH,
  MS_TO_KTS,
  M_TO_FEET,
  KM_TO_NM,
  msToKts,
  MMHG_TO_INHG,
  KG_TO_LBS,
} from "@dcs-web-editor-mono/utils";
import { load } from "./cache";

export const config = {
  coordinates: load("coordinates") || "DMS",
  system: load("system") || "IMPERIAL",
};

export function coordinates(latLon) {
  const all = LLtoAll(latLon.lat, latLon.lon);
  return all[config.coordinates];
}

export function speed(ms: number) {
  return config.system === "IMPERIAL" ? MS_TO_KTS * ms : MS_TO_KMH * ms;
}
export function speedUnit() {
  return config.system === "IMPERIAL" ? "kts" : "kmh";
}

export function altitude(m: number) {
  return config.system === "IMPERIAL"
    ? Math.round(M_TO_FEET * m)
    : Math.round(m);
}
export function altitudeUnit() {
  return config.system === "IMPERIAL" ? "ft" : "m";
}

export function distance(km: number) {
  return config.system === "IMPERIAL" ? KM_TO_NM * km : km;
}
export function distanceUnit() {
  return config.system === "IMPERIAL" ? "nm" : "km";
}

export function pressure(mmHg: number) {
  return config.system === "IMPERIAL" ? MMHG_TO_INHG * mmHg : mmHg;
}
export function pressureUnit() {
  return config.system === "IMPERIAL" ? "inHg" : "mmHg";
}

export function weight(kg: number) {
  return config.system === "IMPERIAL" ? KG_TO_LBS * kg : kg;
}
export function weightUnit() {
  return config.system === "IMPERIAL" ? "lbs" : "kg";
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
  pressure,
  pressureUnit,
  weight,
  weightUnit,
};
