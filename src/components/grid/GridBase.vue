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
            ref="horizLegendEl"
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
            horizLegendWidth: "auto",
            horizLengendRightMargin: "0px",
            horizLengendLeftPadding: "0px",
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
                "width": `calc(${this.horizLegendWidth} + ${this.horizLengendLeftPadding})`,
                "grid-template-columns": this.templateColumns("horiz-legend"),
                "grid-template-rows": "1fr",
                "margin-right": this.horizLengendRightMargin,
                "padding-left": this.horizLengendLeftPadding,
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
        computeHorizLegendStylings() {
            if (!this.enableHorizontalLegend) return;

            const containerEl = this.$refs.containerEl;
            const gridEl = this.$refs.gridEl;
            const vertLegendEl = this.$refs.vertLegendEl;

            
            // --- Compute horizontal legend width ---

            this.horizLegendWidth = (this.lockHorizontalLegend) ? "auto" : `${gridEl.scrollWidth}px`;


            // --- Compute padding-left amount ---

            this.horizLengendLeftPadding = (this.enableVerticalLegend) ? `${vertLegendEl.offsetWidth}px` : "0";

            if (!this.lockHorizontalLegend) return;


            // --- Compute padding-right ammount ---

            // Grid is vertically scrollable
            const gridVertScrollable = gridEl.scrollHeight > containerEl.offsetHeight;

            // Add a right margin to the horizontal legend container to account for the scrollbar
            // (this makes sure the grids line up properly)
            this.horizLengendRightMargin = (gridVertScrollable) ? SCROLLBAR_WIDTH : "0";
        },
        onResize() {
            this.computeHorizLegendStylings();
        },
        onGridScroll() {
            if (!this.enableHorizontalLegend) return;

            const containerEl = this.$refs.containerEl;
            const horizLegendEl = this.$refs.horizLegendEl;

            // Sync the horizontal legend scroll position with the grid container's
            horizLegendEl.scrollLeft = containerEl.scrollLeft;
        },
        // NOTE: intermediate functions, do not use
        __onResize__() {
            this.onResizeDebounced();
        }
    },
    mounted() {
        // Setup html event listeners
        this.$nextTick(() => {
            // Setup window resize event
            window.addEventListener('resize', this.__onResize__);
            // Fire resize event on load (for initialization purposes)
            this.__onResize__();

            // Setup scroll event on the grid container
            const containerEl = this.$refs.containerEl;
            containerEl.addEventListener('scroll', this.onGridScroll);
        });
    },
    beforeDestroy() {
        // Remove event listeners
        window.removeEventListener('resize', this.__onResize__);

        const containerEl = this.$refs.containerEl;
        containerEl.removeEventListener('scroll', this.onGridScroll);
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

            overflow: auto;

            // Hide the scrollbar but keep functionality
            // TODO: this trick doesn't work for Firefox
            // Crhome, Safari and Opera
            &::-webkit-scrollbar {
                display: none;
            }
            // IE and Edge
            -ms-overflow-style: none;
            // Older Firefox versions
            overflow: -moz-scrollbars-none;
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

        // Lock specific overflow stylings
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