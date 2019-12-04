<template>
    <div
        :class="[
            'GridBase',
            lockHorizontalLegend ? 'lock-horizontal-legend' : null,
        ]"
    >
        <overlay-scrollbar 
            class="GridBase__scroll-container"
            :options="{ 
                paddingAbsolute: true,
                scrollbars: {
                    autoHide: 'leave'
                }
            }"
        >
                <div class="GridBase__container">
                    <div 
                        :class="['GridBase__grid', gridClass]"
                        :style="[gridComputedStyles, gridStyle]"
                        :id="[gridId]"
                    >
                        <div 
                            v-if="enableHorizontalLegend"
                            :class="[
                                'GridBase__horizontal-legend', 
                                (lockHorizontalLegend) ? 'lock' : null,
                                horizontalLegendClass
                            ]"
                            :style="[
                                horizontalLegendComputedStyles,
                                horizontalLegendStyle
                            ]"
                            :id="[horizontalLegendId]"
                        >
                            <!-- Horizontal legend cells slot -->
                            <slot name="horizontal-legend"></slot>
                        </div>

                        <div 
                            v-if="enableVerticalLegend"
                            :class="[
                                'GridBase__vertical-legend',
                                (lockVerticalLegend) ? 'lock' : null,
                                verticalLegendClass
                            ]"
                            :style="[
                                verticalLegendComputedStyles,
                                verticalLegendStyle
                            ]"
                            :id="[verticalLegendId]"
                        >
                            <!-- Vertical legend cells slot -->
                            <slot name="vertical-legend"></slot>
                        </div>

                        <div 
                            v-if="enableHorizontalLegend && enableVerticalLegend"
                            :class="[
                                'GridBase__corner-cell', 
                                (lockHorizontalLegend) ? 'lock-horiz' : null,
                                (lockVerticalLegend) ? 'lock-vert' : null,
                                cornerCellClass
                            ]"
                            :style="[
                                cornerCellComputedStyles,
                                cornerCellStyle
                            ]"
                            :id="[cornerCellId]"
                        >
                            <!-- Corner cell slot -->
                            <slot name="corner-cell"></slot>
                        </div>

                        <div 
                            :class="['GridBase__content', contentClass]"
                            :style="[contentComputedStyles, contentStyle]"
                            :id="[contentId]"
                        >
                            <!-- Content cells slot -->
                            <slot></slot>
                        </div>
                    </div>
                </div>
        </overlay-scrollbar>
    </div>
</template>

<script>
import { PositiveNumber, CSSGridLength, CSSGridFunc, CSSLength } from "../../validators";

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
            validator: (val) => CSSGridLength(val) || CSSGridFunc(val)
        },
        cellHeight: {
            type: String,
            default: "15rem",
            validator: (val) => CSSGridLength(val) || CSSGridFunc(val)
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
        // Lock props
        lockHorizontalLegend: {
            type: Boolean,
            default: false
        },
        lockVerticalLegend: {
            type: Boolean,
            default: false
        },
        // Grid cell prefixes
        cellPrefix: {
            type: String,
            default: "cell"
        },
        horizontalLegendPrefix: {
            type: String,
            default: "horiz-legend"
        },
        verticalLegendPrefix: {
            type: String,
            default: "vert-legend"
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
        contentClass: {
            type: String,
            default: null
        },
        contentId: {
            type: String,
            default: null
        },
        contentStyle: {
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
        },
        cornerCellClass: {
            type: String,
            default: null
        },
        cornerCellId: {
            type: String,
            default: null
        },
        cornerCellStyle: {
            type: Object,
            default: null
        }
    },
    computed: {
        // Computed styles
        gridComputedStyles() {
            return {
                "grid-template-columns": this.templateColumns(this.cellPrefix, this.verticalLegendPrefix),
                "grid-template-rows": this.templateRows(this.cellPrefix, this.horizontalLegendPrefix)
            }
        },
        horizontalLegendComputedStyles() {
            const startColNum = (this.enableVerticalLegend) ? "2" : "1";

            return {
                "height": this.horizontalLegendHeight,
                "grid-column": `${startColNum} / -1`,
                "grid-row": `${this.horizontalLegendPrefix}-start / ${this.horizontalLegendPrefix}-end`,

                'grid-template-columns': this.templateColumns(this.horizontalLegendPrefix, null, true),
                'grid-template-rows': 'auto'
            }
        },
        verticalLegendComputedStyles() {
            const startRowNum = (this.enableHorizontalLegend) ? "2" : "1";

            return {
                "width": this.verticalLegendWidth,
                "grid-column": `${this.verticalLegendPrefix}-start / ${this.verticalLegendPrefix}-end`,
                "grid-row": `${startRowNum} / -1`,

                'grid-template-columns': 'auto',
                'grid-template-rows': this.templateRows(this.verticalLegendPrefix, null, true)
            }
        },
        cornerCellComputedStyles() {
            return {
                'grid-column': `${this.verticalLegendPrefix}-start / ${this.verticalLegendPrefix}-end`,
                'grid-row': `${this.horizontalLegendPrefix}-start / ${this.horizontalLegendPrefix}-end`
            }
        },
        contentComputedStyles() {
            const startColNum = (this.enableVerticalLegend) ? "2" : "1";
            const startRowNum = (this.enableHorizontalLegend) ? "2" : "1";

            return {
                "grid-column": `${startColNum} / -1`,
                "grid-row": `${startRowNum} / -1`,

                'grid-template-columns': this.templateColumns(this.cellPrefix, null, true),
                'grid-template-rows': this.templateRows(this.cellPrefix, null, true)
            }
        },
        // Grid templates
        templateColumns() {
            return (cellPrefix, verticalCellPrefix, skipVerticalCell = false) => {
                let templateStr = "[";

                if (this.enableHorizontalLegend && !skipVerticalCell) {
                    templateStr += `${verticalCellPrefix}-start] ${this.verticalLegendWidth} [${verticalCellPrefix}-end `;
                }

                for (let cellNum = 1; cellNum <= this.cellsWide; cellNum++) {
                    const cellName = `${cellPrefix}-${cellNum}`;
                    templateStr += `${cellName}-start] ${this.cellWidth} [${cellName}-end `;
                }

                templateStr += "]";

                return templateStr;
            }
        },
        templateRows() {
            return (cellPrefix, horizontalCellPrefix, skipHorizontalCell = false) => {
                let templateStr = "[";

                if (this.enableVerticalLegend && !skipHorizontalCell) {
                    templateStr += `${horizontalCellPrefix}-start] ${this.horizontalLegendHeight} [${horizontalCellPrefix}-end `;
                }

                for (let cellNum = 1; cellNum <= this.cellsHigh; cellNum++) {
                    const cellName = `${cellPrefix}-${cellNum}`;
                    templateStr += `${cellName}-start] ${this.cellHeight} [${cellName}-end `;
                }

                templateStr += "]";

                return templateStr;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .GridBase {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;

        & .GridBase__scroll-container {
            flex-grow: 1;
            flex-shrink: 1;
        }

        .GridBase__container {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;

            & .GridBase__grid {
                flex-grow: 1;
                flex-shrink: 0;

                width: auto;

                display: grid;  

                & .GridBase__horizontal-legend {
                    &.lock {
                        position: sticky;
                        top: 0;
                    }

                    display: grid;

                    z-index: 2;
                }

                & .GridBase__vertical-legend {
                    &.lock {
                        position: sticky;
                        left: 0;
                    }

                    display: grid;

                    z-index: 1;
                }

                & .GridBase__corner-cell {
                    &.lock-horiz {
                        position: sticky;
                        top: 0;
                    }

                    &.lock-vert {
                        position: sticky;
                        left: 0;
                    }

                    z-index: 3;
                }

                & .GridBase__content {
                    display: grid;
                }
            }
        }
    }
</style>