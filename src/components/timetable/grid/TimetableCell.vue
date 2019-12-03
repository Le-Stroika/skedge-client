<template>
    <div 
        :class="[
            'TimetableCell', 
            isBottommost ? 'bottommost' : null,
            isRightmost ? 'rightmost' : null
        ]"
        :style="styles"
    >
    </div>
</template>

<script>
export default {
    props: {
        cellNum: {
            type: Number,
            required: true
        },
        cellPrefix: {
            type: String,
            required: true
        },
        cellsWide: {
            type: Number,
            required: true
        },
        cellsHigh: {
            type: Number,
            required: true
        },
        cellWidth: {
            type: Number,
            default: 1
        },
        cellHeight: {
            type: Number,
            default: 1
        }
    },
    computed: {
        styles() {
            const rowNum = this.getRow(this.cellNum - 1) + 1;
            const colNum = this.getCol(this.cellNum - 1) + 1;

            return {
                'grid-column': `${this.cellPrefix}-${colNum}-start
                                / ${this.cellPrefix}-${colNum + this.cellWidth - 1}-end`,
                'grid-row': `${this.cellPrefix}-${rowNum}-start
                                / ${this.cellPrefix}-${rowNum + this.cellHeight - 1}-end`
            }
        },
        isBottommost() {
            const row = this.getRow(this.cellNum);
            return (row === this.cellsHigh - 1);
        },
        isRightmost() {
            const col = this.getCol(this.cellNum);
            return (col === 0); // Rememeber it is offset by one from the system used in the grid
        }
    },
    methods: {
        getRow(n) { // Note: n is zero-based
            return Math.floor(n / this.cellsWide) * this.cellHeight;
        },
        getCol(n) {
            return n % (this.cellsWide) * this.cellWidth;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "./timetable-common.scss";

    .TimetableCell {
        border-right: $line-light-style;
        border-bottom: $line-light-style;

        &.bottommost {
            border-bottom: none;
        }

        &.rightmost {
            border-right: none;
        }
    }
</style>