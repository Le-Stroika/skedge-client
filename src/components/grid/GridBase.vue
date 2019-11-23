<template>
    <div 
        class="GridBase"
    >
        <div 
            class="GridBase__grid"
            :style="gridStyles"
        >

        </div>
    </div>
</template>

<script>
import { PositiveNumber, CSSGridLength } from "../../validators";

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
        enableHorizontalLegend: {
            type: Boolean,
            default: false
        },
        enableVerticalLegend: {
            type: Boolean,
            default: false
        }
        // horizontalData: {
        //     type: Array, // Array of strings
        //     default: () => []
        // }
    },
    computed: {
        gridStyles() {
            return {
                "grid-template-columns": `repeat(${this.cellsWide}, ${this.cellWidth})`,
                "grid-template-rows": `repeat(${this.cellsHigh}, ${this.cellHeight})`
            }
        }
    },
    mounted() {
        console.log(this.$store);
    }
}
</script>

<style lang="scss" scoped>
    .GridBase {
        width: 100%;
        height: 100%;

        border-radius: 0.2rem;

        overflow: auto;

        background-color: rgb(68, 68, 68); // TODO: theme 

        & .GridBase__grid {
            display: grid;
        }
    }
</style>