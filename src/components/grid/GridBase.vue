<template>
    <div 
        :class="[
            'GridBase',
            lockHorizontalLegend ? 'lock-horizontal-legend' : null,
        ]"
    >
        <div
            v-if="enableHorizontalLegend" 
            :class="['GridBase__horizontal-legend', horizontalLegendClass]"
            :style="[horizontalLegendComputedStyles, horizontalLegendStyle]"
            :id="[horizontalLegendId]"
        >
            <slot name="horizontal-legend"></slot>
        </div>

        <div 
            class="GridBase__container"
            ref="containerEl"
        >
            <div 
                :class="['GridBase__vertical-legend', verticalLegendClass]"
                :style="[verticalLegendComputedStyles, verticalLegendStyle]"
                :id="[verticalLegendId]"
                ref="vertLegendEl"
            >
                <slot name="vertical-legend"></slot>
            </div>

            <div class="GridBase__grid-container">
                <div 
                    :class="['GridBase__grid', gridClass]"
                    :style="[gridComputedStyles, gridStyle]"
                    :id="[gridId]"
                    ref="gridEl"
                >
                    <!-- Default slot -->
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PositiveNumber, CSSGridLength, CSSLength } from "../../validators";
import * as Utilities from "../../utilities";

const SCROLLBAR_WIDTH = "5px";
const DEBOUNC_RATE = 50;

export default {
    props: {
        cellsWide: {
            type: Number,
            required: true,
            validator: PositiveNumber
        },
        cellsHigh: {
            type: Number,
            required: true,
            validator: PositiveNumber
        },
        cellWidth: {
            type: String,
            default: "1fr",
            validator: CSSGridLength
        },
        cellHeight: {
            type: String,
            default: "15rem",
            validator: CSSGridLength
        },
        // Legend props
        enableHorizontalLegend: {
            type: Boolean,
            default: false
        },
        enableVerticalLegend: {
            type: Boolean,
            default: false
        },
        horizontalLegendHeight: {
            type: String,
            default: "auto",
            validator: CSSLength
        },
        verticalLegendWidth: {
            type: String,
            default: "auto",
            validator: CSSLength
        },
        lockHorizontalLegend: {
            type: Boolean,
            default: false
        },
        // Internal class props
        gridClass: {
            type: String,
            default: null
        },
        gridId: {
            type: String,
            default: null
        },
        gridStyle: {
            type: Object,
            default: null
        },
        horizontalLegendClass: {
            type: String,
            default: null
        },
        horizontalLegendId: {
            type: String,
            default: null
        },
        horizontalLegendStyle: {
            type: Object,
            default: null
        },
        verticalLegendClass: {
            type: String,
            default: null
        },
        verticalLegendId: {
            type: String,
            default: null
        },
        verticalLegendStyle: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            onResizeDebounced: Utilities.debounce(this.onResize, DEBOUNC_RATE),
            horizLengendRightPad: "0",
            horizLegendLeftPad: "0",
        }
    },
    computed: {
        gridComputedStyles() {
            return {
                "grid-template-columns": this.templateColumns(),
                "grid-template-rows": this.templateRows()
            }
        },
        horizontalLegendComputedStyles() {
            return {
                "height": this.horizontalLegendHeight,
                // "padding-left": (this.enableVerticalLegend) ? this.verticalLegendWidth : "0",
                "grid-template-columns": this.templateColumns("horiz-legend"),
                "grid-template-rows": "1fr",
                "padding-right": this.horizLengendRightPad,
                "padding-left": this.horizLegendLeftPad,
            }
        },
        verticalLegendComputedStyles() {
            return {
                "width": this.verticalLegendWidth,
                "grid-template-columns": "1fr",
                "grid-template-rows": this.templateRows("vert-legend")
            }
        },
        templateColumns() {
            return (cellPrefix = "cell") => {
                let templateStr = "[";

                for (let cellNum = 1; cellNum <= this.cellsWide; cellNum++) {
                    const cellName = `${cellPrefix}-${cellNum}`;
                    templateStr += `${cellName}-start] ${this.cellWidth} [${cellName}-end `;
                }

                templateStr += "]";

                return templateStr;
            }
        },
        templateRows() {
            return (cellPrefix = "cell") => {
                let templateStr = "[";

                for (let cellNum = 1; cellNum <= this.cellsHigh; cellNum++) {
                    const cellName = `${cellPrefix}-${cellNum}`;
                    templateStr += `${cellName}-start] ${this.cellHeight} [${cellName}-end `;
                }

                templateStr += "]";

                return templateStr;
            }
        }
    },
    methods: {
        computeHorizLegendPaddings() {
            if (!this.enableHorizontalLegend) return;

            // Compute padding-left amount

            if (this.enableVerticalLegend) {
                const vertLegendEl = this.$refs.vertLegendEl;
                this.horizLegendLeftPad = `${vertLegendEl.offsetWidth}px`;
            } else {
                this.horizLegendLeftPad = "0";
            }

            if (!this.lockHorizontalLegend) return;

            // Compute padding right ammount
        
            const containerEl = this.$refs.containerEl;
            const gridEl = this.$refs.gridEl;

            // Grid is scrolling
            const gridScrolling = gridEl.scrollHeight > containerEl.offsetHeight;

            // Add padding to the horizontal legend container to account for the scrollbar
            // (this makes sure the grids line up properly)
            this.horizLengendRightPad = (gridScrolling) ? SCROLLBAR_WIDTH : "0";
        },
        onResize() {
            this.computeHorizLegendPaddings();
        },
        // NOTE: intermediate functions, do not use
        __onResize__() {
            this.onResizeDebounced();
        }
    },
    mounted() {
        // Setup window resize listener
        this.$nextTick(() => {
            window.addEventListener('resize', this.__onResize__);
            // Fire resize event on load (for initialization purposes)
            this.__onResize__();
        });
    },
    beforeDestroy() {
        // Remove window resize listener
        window.removeEventListener('resize', this.__onResize__);
    }
}
</script>

<style lang="scss" scoped>
    .GridBase {
        width: 100%;
        height: 100%;

        border-radius: 0.2rem;

        overflow: auto;

        display: flex;
        flex-direction: column;

        & .GridBase__horizontal-legend {
            flex-grow: 0;
            flex-shrink: 0;

            display: grid;
        }

        & .GridBase__container {
            flex-grow: 1;
            flex-shrink: 1;

            display: flex;
            flex-direction: row;
            align-items: stretch;

            & .GridBase__vertical-legend {
                flex-grow: 0;
                flex-shrink: 0;

                display: grid;
            }

            & .GridBase__grid-container {
                flex-grow: 1;
                flex-shrink: 1;

                & .GridBase__grid {
                    display: grid;

                    border-radius: 5rem;
                }

            }   
        }

        &.lock-horizontal-legend {
            overflow: hidden;

            & .GridBase__container {
                overflow: auto;
            }
        }

        &:not(.lock-horizontal-legend) {
            overflow: auto;
        }
    }
</style>