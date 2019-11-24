import * as Utilities from "../utilities";

// Custom Vue types for props

export const CSSLength = val => Utilities.isCSSLength(val);
export const CSSRotation = val => Utilities.isCSSRotation(val);
export const Direction = val => Utilities.isDirection(val);
export const CSSGridLength = val => Utilities.isCSSLength(val) 
                                    || Utilities.isCSSFrUnit(val);

// minmax or fit-content functions
export const CSSGridFunc = val => {
    const rMinMax = /^minmax\(([\d|\w|%|-]+),\s?([\d|\w|%|-]+)\)$/gm
    const rFitContent = /^fit-content\(([\d|\w|%|-]+)\)/gm;

    const minMaxMatch = rMinMax.exec(val);
    const fitContentMatch = rFitContent.exec(val);

    return (minMaxMatch || fitContentMatch);
}

export const PositiveNumber = val => val > 0;
export const ZeroNumber = val => val === 0;
export const NegativeNumber = val => val < 0;