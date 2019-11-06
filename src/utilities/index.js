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