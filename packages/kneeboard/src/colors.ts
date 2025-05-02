export const primaryColor = () => {
    const style = getComputedStyle(document.querySelector(".kneeboard"));
    const color = style.getPropertyValue("--primary-color");
    return color;
};

export const secondaryColor = () => {
    const style = getComputedStyle(document.querySelector(".kneeboard"));
    const color = style.getPropertyValue("--secondary-color");
    return color;
};
export const fontFamily = () => {
    const style = getComputedStyle(document.querySelector(".kneeboard"));
    const font = style.getPropertyValue("--font-family");
    return font;
};
