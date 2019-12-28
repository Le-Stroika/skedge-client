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

const ERROR_BG = "#723737";
const ERROR_TEXT = "#FF6464";
const WARNING_BG = "#635C42";
const WARNING_TEXT = "#E5E947";
const SUCCESS_BG = "#375337";
const SUCCESS_TEXT = "#60E14C";
const INFO_BG = "#4A677B";
const INFO_TEXT = "#4DE6FB";


export default {
    name: "dark",
    theme: {
        GLOBAL: {
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
            },
            error_color: {
                background: ERROR_BG,
                text: ERROR_TEXT
            },
            warning_color: {
                background: WARNING_BG,
                text: WARNING_TEXT
            },
            success_color: {
                background: SUCCESS_BG,
                text: SUCCESS_TEXT
            },
            info_color: {
                background: INFO_BG,
                text: INFO_TEXT
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
        },
        TimetableGrid: {
            background_color: {
                primary: GREY_2
            },
            accent_color: {
                primary: "#303030",
                secondary: "#383838" // #464646
            }
        }
    }
};