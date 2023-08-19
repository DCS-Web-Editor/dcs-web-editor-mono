
const style = getComputedStyle(document.querySelector('.kneeboard'));

export const primaryColor = () => {
  const color = style.getPropertyValue('--primary-color');
  return color;
} 

export const secondaryColor = () => {
  const color = style.getPropertyValue('--secondary-color');
  return color;
} 
export const fontFamily = () => {
  const font = style.getPropertyValue('--font-family');
  return font;
} 

