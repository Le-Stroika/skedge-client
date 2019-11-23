import { configure, addDecorator, addParameters } from '@storybook/vue';
import { withRootAttribute } from "storybook-addon-root-attribute";

// Global sass imports
import "../src/styles/global.scss"; // Client global sass
import "../stories/global-story-styles.scss"; // Storybook-specific global sass

// ------------------------------------
// --- Setup Global Theme Injection ---
// ------------------------------------

import Themer from "themer";
import { schema, mixins } from "../src/theme/definition";
import themes from "../src/theme/themes";
import { DEFAULT_THEME } from "../src/constants/generalConstants";

// Generates every given theme and returns with entries containing the generated
// theme values for each theme (key is the theme name)
function _generateAllThemes(schema, mixins, themes) {
    const generatedThemes = {};

    Object.values(themes).forEach(({ name, theme }) => {
        const currGenerated = Themer.generate(theme, schema, mixins, {}, { PREFIX: "--" });
        generatedThemes[name] = currGenerated;
    });

    return generatedThemes;
}


// Converts the theme generation object to a CSS string
function _themeGenToString(themeGeneration) {
    let conversionStr = "";

    Object.entries(themeGeneration).forEach(([ key, value ]) => {
        conversionStr += `${key}: ${value}; `;
    });

    // Set the root background and text color to link to the theme
    conversionStr += `background-color: rgba(var(--global__background_color__primary),1); `;
    conversionStr += `color: rgba(var(--global__text_color__primary),1); `;

    return conversionStr;
}

// Computes all the state values for the theme generations. 
// Ignores the default theme (as it is put in manually)
function _allStates(allThemeGens, defaultTheme) {
    const states = [];

    Object.entries(allThemeGens).forEach(([name, generation]) => {
        // Ignore default theme
        if (name === defaultTheme) {
            return;
        }

        // Convert the generation values to string and add the theme to the state
        const toStr = _themeGenToString(generation);
        states.push({
            name: name,
            value: toStr
        });
    });

    return states;
}

const allThemeGens = _generateAllThemes(schema, mixins, themes);

addDecorator(withRootAttribute);
addParameters({
    // Inject the theme values onto the root and add all theme button switches
    rootAttribute: {
        root: "html",
        attribute: "style",
        defaultState: {
            name: DEFAULT_THEME,
            value: _themeGenToString(allThemeGens[DEFAULT_THEME])
        },
        states: [
            ..._allStates(allThemeGens, DEFAULT_THEME)
        ]
    }
});

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
