// TODO: design the theming schema

export const schema = {
    global: {
        "primary": {
            $type: "color",
            $required: true
        },
        "secondary": {
            $type: "color",
            $required: true
        }
    }
};

export const mixins = {
    
};

export default {
    schema,
    mixins
};