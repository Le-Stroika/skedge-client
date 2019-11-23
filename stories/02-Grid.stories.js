import { action } from '@storybook/addon-actions';

import GridBase from "@/components/grid/GridBase.vue";
import GridItem from "@/components/grid/GridItem.vue";

export default {
    title: "Grid"
};

export const main = () => ({
    template: `
        <grid-base
            :cells-wide="cellsWide"
            :cells-high="cellsHigh"
            cell-width="1fr"
            cell-height="15rem"
            :enable-horizontal-legend="true"
            :enable-vertical-legend="true"
            vertical-legend-width="auto"
            horizontal-legend-height="auto"
            :lock-horizontal-legend="true"

            :style="{
                'background-color': 'rgb(68, 68, 68)'
            }"
        >
            <template
                #horizontal-legend
            >
                <!-- Mock horizontal legend cells -->
                <div
                    v-for="n in cellsWide"
                    :key="n"
                    :style="{
                        'border': '1px solid black',
                        'grid-column': 'horiz-legend-' + n + '-start / horiz-legend-' + n + '-end',
                        'grid-row': '1'
                    }"
                >
                    Horiz {{ n }}
                </div>
            </template>

            <template
                #vertical-legend
            >
                <!-- Mock vertical legend cells -->
                <div
                    v-for="n in cellsHigh"
                    :key="n"
                    :style="{
                        'width': '100%',
                        'height': '100%',
                        'border': '1px solid black',
                        'grid-column': '1',
                        'grid-row': 'vert-legend-' + n + '-start / vert-legend-' + n + '-end'
                    }"
                >
                    Vert {{ n }}
                </div>
            </template>

            <template>
                <!-- Mock grid cells -->
                <div
                    v-for="n in cellsHigh * cellsWide"
                    :key="n"
                    :style="{
                        'width': '100%',
                        'height': '100%',
                        'border': '1px solid black',
                        'grid-column': 'cell-' + (getCol(n-1) + 1) + '-start / cell-' + (getCol(n-1) + 1) + '-end',
                        'grid-row': 'cell-' + (getRow(n-1) + 1) + '-start / cell-' + (getRow(n-1) + 1) + '-end'
                    }"
                >
                    Cell {{ n }}
                </div>
            </template>
        </grid-base>
    `,
    components: {
        GridBase,
        GridItem
    },
    data() {
        return {
            cellsWide: 5,
            cellsHigh: 5
        }
    },
    methods: {
        getRow(n) { // Note: n is zero-based
            return Math.floor(n / this.cellsWide);
        },
        getCol(n) {
            return n % this.cellsWide;
        },
    }
});