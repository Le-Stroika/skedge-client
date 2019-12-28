export const schema = {
    GLOBAL: {
        $mixins: 'base_section'
    },
    // Page views
    HomeView: {
        $inherits: 'GLOBAL'
    },
    FallWinterView: {
        $inherits: 'GLOBAL'
    },
    SummerView: {
        $inherits: 'GLOBAL'
    },
    // Components
    ButtonBase: {
        $inherits: 'GLOBAL'
    },
    SettingsCog: {
        $inherits: 'GLOBAL'
    },
    Checkbox: {
        $inherits: 'GLOBAL'
    },
    SelectField: {
        $inherits: 'GLOBAL'
    },
    // Timetable components
    TimetableGrid: {
        $inherits: 'GLOBAL'
    },
    TimetableCell: {
        $inherits: 'GLOBAL'
    },
    TimetableDay: {
        $inherits: 'GLOBAL'
    },
    TimetableTime: {
        $inherits: 'GLOBAL'
    },
    // Notification components
    ErrorNotification: {
        $inherits: 'GLOBAL'
    },
    WarningNotification: {
        $inherits: 'GLOBAL'
    },
    SuccessNotification: {
        $inherits: 'GLOBAL'
    },
    InfoNotification: {
        $inherits: 'GLOBAL'
    },
};

export const mixins = {
    // --------------
    // -- Sections --
    // --------------
    base_section: {
        background_color: {
            $mixins: 'background'
        },
        text_color: {
            $mixins: 'text'
        },
        text_color_inverted: {
            $mixins: 'text'
        },
        accent_color: {
            $mixins: 'accent'
        },
        selected_color: {
            $mixins: 'selected'
        },
        disabled_color: {
            $mixins: 'disabled'
        },
        // Scrollbar
        scrollbar: {
            main_color: {
                $mixins: ['primary_modifier', 'secondary_modifier']
            },
            hover_color: {
                $mixins: ['primary_modifier']
            }
        },
        // Notification colors
        error_color: {
            $mixins: ['background_modifier', 'text_modifier']
        },
        warning_color: {
            $mixins: ['background_modifier', 'text_modifier']
        },
        success_color: {
            $mixins: ['background_modifier', 'text_modifier']
        },
        info_color: {
            $mixins: ['background_modifier', 'text_modifier']
        }
    },
    // ------------------
    // -- Color groups --
    // ------------------
    background: {
        $mixins: ['primary_modifier', 'secondary_modifier', 'tertiary_modifier']
    },
    text: {
        $mixins: ['primary_modifier', 'secondary_modifier']
    },
    accent: {
        $mixins: ['primary_modifier', 'secondary_modifier']
    },
    selected: {
        $mixins: ['primary_modifier', 'secondary_modifier']
    },
    disabled: {
        $mixins: ['primary_modifier', 'secondary_modifier']
    },
    // ---------------
    // -- Modifiers --
    // ---------------
    primary_modifier: {
        primary: {
            $type: "color",
            $required: true
        }
    },
    secondary_modifier: {
        secondary: {
            $type: "color",
            $required: true
        }
    },
    tertiary_modifier: {
        tertiary: {
            $type: "color",
            $required: true
        },
    },
    quaternary_modifier: {
        quaternary: {
            $type: "color",
            $required: true
        }
    },
    background_modifier: {
        background: {
            $type: "color",
            $required: true
        }
    },
    text_modifier: {
        text: {
            $type: "color",
            $required: true
        }
    }
};

export default {
    schema,
    mixins
};