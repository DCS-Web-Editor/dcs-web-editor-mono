export const mmHgToinHG = (mmHG) => {
    const qnh = mmHG / 25.4;
    return Number(qnh.toFixed(2));
};
export const inHgTommHG = (inHg) => {
    const qnh = inHg * 25.4;
    return Number(qnh.toFixed(2));
};
export const ftToM = (value) => {
    return Math.round(value / 3.28084);
};
export const MToft = (value) => {
    return Math.round(value * 3.28084);
};
export const RoundTo100 = (value) => {
    return Math.round(value / 100) * 100;
};
