<template>
    <div
        :class="[
            'TimetableTime',
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
// TODO: try not to hardcode this in
const TIMES = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
                "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

export default {
    props: {
        time: {
            type: String,
            validator: val => TIMES.includes(val),
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
            return (TIMES.indexOf(this.time) * this.cellsPerTime) + 1;
        },
        isTopmost() {
            return this.timeNum === 1;
        },
        isBottommost() {
            return this.timeNum === TIMES.length * this.cellsPerTime - 1;
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

    .TimetableTime {
        border-bottom: $line-style;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        padding: 0 1rem;

        &.bottommost {
            border-bottom: none;
        }

        & .TimetableTime__time {
            
        }
    }
</style>