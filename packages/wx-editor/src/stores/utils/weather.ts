import type { TWeather } from "./wxtypes";

export const Weather: TWeather = {
  atmosphere_type: 0,
  clouds: {
    base: 2500,
    density: 0,
    iprecptns: 0,
    thickness: 0,
  },
  cyclones: [],
  dust_density: 0,
  enable_dust: false,
  enable_fog: false,
  fog: {
    thickness: 0,
    visibility: 0,
  },
  groundTurbulence: 0,
  halo: {
    preset: "off",
    crystalsPreset: "Tangents",
  },
  modifiedTime: true,
  name: "Winter, clean sky",
  qnh: 760,
  season: {
    temperature: 9,
  },
  type_weather: 0,
  visibility: {
    distance: 80000,
  },
  wind: {
    at2000: {
      dir: 0,
      speed: 0,
    },
    at8000: {
      dir: 0,
      speed: 0,
    },
    atGround: {
      dir: 0,
      speed: 0,
    },
  },
};
