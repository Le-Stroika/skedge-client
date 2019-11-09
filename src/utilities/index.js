// -----------------------------------------------
// --- Helpers for the helpers (helperception) ---
// -----------------------------------------------

// Serializes an given element
function serializeInputEl(i_el, i_bSelectRoot = false) {
    if (i_el && isElement(i_el)) {
        // Return the element since it's already one
        return i_el;
    } else if (i_el) {
        // Select the element
        return document.querySelector(i_el);
    } else {
        // Return root
        if (i_bSelectRoot) {
            return document.documentElement;
        } else {
            throw new Error(`Error: ${i_el} is an invalid element`);
        }
    }
}

//Returns true if it is a DOM element    
function isElement(o){
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
}

// -----------------------
// --- Utility methods ---
// -----------------------

/**
 * Saves a value to a css property.
 * 
 * @param {String} i_sPropertyName The name of the property.
 * @param {String} i_sPropertyValue The value to set the property to.
 * @param {String | HTMLElement} [i_el] (Optional) The element or selector for the element.
 */
export const saveCSSProperty = (i_sPropertyName, i_sPropertyValue, i_el = null) => {
    // Serialize the input element/query selector/none
    const el = serializeInputEl(i_el, true);
    // Set the custom property
    el.style.setProperty(i_sPropertyName, i_sPropertyValue);
};

/**
 * Removes a css property.
 * 
 * @param {Stirng} i_sPropertyName The name of the property.
 * @param {String | HTMLElement} [i_el] (Optional) The element or selector for the element.
 */
export const removeCSSProperty = (i_sPropertyName, i_el = null) => {
    // Serialize the input element/query selector/none
    const el = serializeInputEl(i_el, true);
    // Remove the custom property
    el.style.removeProperty(i_sPropertyName);
};

/**
 * Returns if the given string is a valid CSS length.
 * Ex: '5rem', '20%', '15px, etc
 * 
 * @param {String} i_sLength The CSS length.
 */
export function isCSSLength(i_sLength) {
    const rCSSLengthRegex = /^(\d*?.?\d+)(rem|em|px|cm|mm|in|pt|pc|ch|vw|vh|vmin|vmax|%)$/g;
    return rCSSLengthRegex.test(i_sLength);
}

/**
 * Returns if the given string is a valid CSS rotation.
 * Ex: '45deg', '3.14rad', '400grad', '1turn', etc
 * 
 * @param {String} i_sRotation The CSS rotation.
 */
export function isCSSRotation(i_sRotation) {
    const rCSSRotationRegex = /^(\d*?.?\d+)(deg|rad|grad|turn)$/g;
    return rCSSRotationRegex.test(i_sRotation);
}

/**
 * Returns if the given string is a valid direction.
 * Ie: "right", "left", "up" or "down"
 * 
 * @param {String} i_sDirection The direction.
 */
export function isDirection(i_sDirection) {
    return ["right", "left", "up", "down"].indexOf(i_sDirection) !== -1;
}

/**
 * Returns an object containing all neccessairy styles to configure the md-icon component.
 * 
 * @param {String} i_sSize The CSS size.
 * @param {String} i_sFontSizeModifier The increase modifier for the font-size relative to the base size.
 */
export function getIconSizeCSSStyles(i_sSize, i_sFontSizeModifier = '0rem') {
    return {
        width: i_sSize,
        height: i_sSize,
        minWidth: i_sSize,
        fontSize: `calc(${i_sSize} + ${i_sFontSizeModifier}) !important`
    }
}