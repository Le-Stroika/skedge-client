import { action } from '@storybook/addon-actions';

import GridBase from "@/components/grid/GridBase.vue";
import GridItem from "@/components/grid/GridItem.vue";

export default {
    title: "Grid"
};

export const main = () => ({
    components: {
        GridBase,
        GridItem
    },
    template: `
        <grid-base
            :cells-wide="5"
            :cells-high="5"
        >

        </grid-base>
    `
});