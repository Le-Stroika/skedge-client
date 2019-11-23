const WHITE = "#FFFFFF";
const BLACK = "#000000";

const GREY_1 = "#2E2E2E";
const GREY_2 = "#414141";
const GREY_3 = "#3C3C3C";
const GREY_4 = "#616161";
const GREY_5 = "#D3D3D3";

const BLUE_MAIN_1 = "#3D4364";
const BLUE_MAIN_2 = "#434C79";
const BLUE_MAIN_3 = "#556095";
const BLUE_MAIN_4 = "#7682BB";

const BLUE_ALT_1 = "#3A6BA4";
const BLUE_ALT_2 = "#4D75A3";
const BLUE_ALT_3 = "#5485BD";

const BLUE_GREY_1 = "#55596C";

export default {
    name: "dark",
    theme: {
        global: {
            background_color: {
                primary: GREY_1,
                secondary: GREY_2,
                tertiary: GREY_4,
            },
            text_color: {
                primary: WHITE,
                secondary: GREY_5
            },
            text_color_inverted: {
                primary: BLACK,
                secondary: GREY_3
            },
            accent_color: {
                primary: BLUE_MAIN_2,
                secondary: BLUE_MAIN_3,
                // tertiary: BLUE_MAIN_4
            },
            selected_color: {
                primary: BLUE_MAIN_1,
                secondary: BLUE_ALT_1,
                // tertiary: BLUE_ALT_3,
            },
            disabled_color: {
                primary: BLUE_GREY_1,
                secondary: BLUE_ALT_2
            },
            scrollbar: {
                main_color: {
                    primary: GREY_3,
                    secondary: GREY_4
                },
                hover_color: {
                    primary: BLUE_GREY_1
                }
            }
        },
        Checkbox: {
            background_color: {
                primary: BLUE_MAIN_2,
                secondary: BLUE_MAIN_3,
                tertiary: GREY_5
            },
            text_color: {
                primary: GREY_5
            },
            selected_color: {
                primary: BLUE_ALT_1,
                secondary: BLUE_ALT_3
            },
            disabled_color: {
                primary: BLUE_GREY_1,
                secondary: GREY_5
            }
        },
        SelectField: {
            background_color: {
                primary: GREY_4,
                secondary: GREY_4,
                tertiary: GREY_2
            },
            selected_color: {
                primary: BLUE_ALT_2
            }
        }
    }
};