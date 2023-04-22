interface Cyclones {
  centerX: number
  centerZ: number
  ellipticity: number
  pressure_excess: number
  pressure_spread: number
  rotation: number
}

export type TWeather = {
  atmosphere_type: number
  clouds: {
    preset?: string
    base: number
    density?: number
    iprecptns?: number
    thickness?: number
  }
  cyclones: Cyclones[]
  dust_density: number
  enable_dust: boolean
  enable_fog: boolean
  fog: {
    thickness: number
    visibility: number
  }
  groundTurbulence: number
  halo: {
    crystalsPreset?: string
    preset: string
  }
  modifiedTime: boolean
  name: string // 'Winter, clean sky'
  qnh: number
  season: {
    temperature: number
  }
  type_weather: number
  visibility: {
    distance: number
  }
  wind: {
    at2000: {
      dir: number
      speed: number
    }
    at8000: {
      dir: number
      speed: number
    }
    atGround: {
      dir: number
      speed: number
    }
  }
}
