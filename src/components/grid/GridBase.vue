<template>
    <header-lock 
        :class="[
            'GridBase',
            lockHorizontalLegend ? 'lock-horizontal-legend' : null,
        ]"
        :lock="lockHorizontalLegend"

        :header-class="horizontalLegendClass"
        :header-style="horizontalLegendStyle"
        :header-id="horizontalLegendId"

        :sidebar-class="verticalLegendClass"
        :sidebar-style="verticalLegendStyle"
        :sidebar-id="verticalLegendId"

        :content-class="gridClass"
        :content-style="gridStyle"
        :content-id="gridId"
    >
        <template #header>
            <div
                v-if="enableHorizontalLegend" 
                class="GridBase__horizontal-legend"
                :style="horizontalLegendComputedStyles"
                ref="horizLegendEl"
            >
                <slot name="horizontal-legend"></slot>
            </div>
        </template>

        <template #sidebar>
            <div 
                v-if="enableVerticalLegend"
                class="GridBase__vertical-legend"
                :style="verticalLegendComputedStyles"
                ref="vertLegendEl"
            >
                <slot name="vertical-legend"></slot>
            </div>
        </template>

        <template>
            <div 
                class="GridBase__grid"
                :style="gridComputedStyles"
                ref="gridEl"
            >
                <slot></slot>
            </div>
        </template>
    </header-lock>
</template>

<script>
import HeaderLock from "@/components/utility/HeaderLock.vue";

import { PositiveNumber, CSSGridLength, CSSGridFunc, CSSLength } from "../../validators";

export default {
    components: {
        HeaderLock
    },
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
        lockHorizontalLegend: {
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
    computed: {
        gridComputedStyles() {
            return {
                "grid-template-columns": this.templateColumns(this.cellPrefix),
                "grid-template-rows": this.templateRows(this.cellPrefix)
            }
        },
        horizontalLegendComputedStyles() {
            return {
                "height": this.horizontalLegendHeight,
                "grid-template-columns": this.templateColumns(this.horizontalLegendPrefix),
                "grid-template-rows": "1fr"
            }
        },
        verticalLegendComputedStyles() {
            return {
                "width": this.verticalLegendWidth,
                "grid-template-columns": "1fr",
                "grid-template-rows": this.templateRows(this.verticalLegendPrefix)
            }
        },
        templateColumns() {
            return (cellPrefix) => {
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
            return (cellPrefix) => {
                let templateStr = "[";

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

        & .GridBase__horizontal-legend {
            display: grid;

            width: 100%;
            overflow: visible;
        }

        & .GridBase__vertical-legend {
            flex-grow: 0;
            flex-shrink: 0;

            display: grid;
        }

        & .GridBase__grid {
            display: grid;

            border-radius: 5rem;
        }
    }
</style>