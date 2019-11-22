import { action } from '@storybook/addon-actions';

import ButtonBase from "../src/components/ui/ButtonBase.vue";

export default {
    title: 'ButtonBase'
};

export const test = () => ({
    components: { 
        ButtonBase 
    },
    template: `
        <button-base
            @click="onClick"
        >
            Hi there
        </button-base>
    `,
    methods: {
        onClick: action("clicked")
    }
});