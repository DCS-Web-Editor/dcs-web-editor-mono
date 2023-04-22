export const mmHgToinHG = (mmHG: number) => {
  const qnh = mmHG / 25.4
  return Number(qnh.toFixed(2))
}

export const inHgTommHG = (inHg: number) => {
  const qnh = inHg * 25.4
  return Number(qnh.toFixed(2))
}

export const ftToM = (value: number) => {
  return Math.round(value / 3.28084)
}

export const MToft = (value: number) => {
  return Math.round(value * 3.28084)
}
