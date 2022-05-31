const randomNumber = () => {
    return Math.floor(Math.random() * 256);
};

const randomRgb = () => {
    var red = randomNumber();
    var green = randomNumber();
    var blue = randomNumber();
    return [red, green, blue];
};

const randomColor = () => {
    const rgbVals = randomRgb();
    // @ts-ignore
    return rgbVals[0] + ', ' + rgbVals[1] + ', ' + rgbVals[2];
};
export default randomColor;
