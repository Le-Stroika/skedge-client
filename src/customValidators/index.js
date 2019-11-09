import * as Utilities from "../utilities";

// Custom Vue types for props

export const CSSLength = val => Utilities.isCSSLength(val);
export const CSSRotation = val => Utilities.isCSSRotation(val);
export const Direction = val => Utilities.isDirection(val);