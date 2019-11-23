import { action } from '@storybook/addon-actions';

import GridBase from "@/components/grid/GridBase.vue";
import GridItem from "@/components/grid/GridItem.vue";

export default {
    title: "Grid"
};

export const temp = () => ({
    components: {
        GridBase,
        GridItem
    },
    template: `
        <grid-base>
        
        </grid-base>
    `
});