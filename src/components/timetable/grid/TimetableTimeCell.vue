<template>
    <div
        :class="[
            'TimetableTimeCell',
            (this.isTopmost) ? 'topmost' : null,
            (this.isBottommost) ? 'bottommost' : null
        ]"
        :style="styles"
    >
        <span class="TableTime__time">
            {{ time }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        time: {
            type: String,
            required: true
        },
        timesList: {
            type: Array,
            required: true
        },
        cellPrefix: {
            type: String,
            required: true
        },
        cellsPerTime: {
            type: Number,
            required: true
        }
    },
    computed: {
        timeNum() {
            return (this.timesList.indexOf(this.time) * this.cellsPerTime) + 1;
        },
        isTopmost() {
            return this.timeNum === 1;
        },
        isBottommost() {
            return this.timeNum === this.timesList.length * this.cellsPerTime - 1;
        },
        styles() {
            // Compute what cells this current timetable time cell should span
            return { 
                'grid-column': '1',
                'grid-row': `${this.cellPrefix}-${this.timeNum}-start 
                            / ${this.cellPrefix}-${this.timeNum + this.cellsPerTime - 1}-end`
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "./timetable-common.scss";

    .TimetableTimeCell {
        border-bottom: $line-style;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        padding: 0 1rem;

        &.bottommost {
            border-bottom: none;
        }

        & .TimetableTimeCell__time {
            
        }
    }
</style>