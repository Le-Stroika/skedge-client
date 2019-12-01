<template>
    <div
        :class="[
            'TimetableDay', 
            (this.isLeftmost) ? 'leftmost' : null,
            (this.isRightMost) ? 'rightmost' : null
        ]"
        :style="styles"
    >
        <span class="TimetableDay__day">
            {{ day }}
        </span>
    </div>
</template>

<script>
// TODO: try not to hardcode this in
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default {
    props: {
        day: {
            type: String,
            validator: val => DAYS.includes(val),
            required: true
        },
        cellPrefix: {
            type: String,
            required: true
        }
    },
    computed: {
        dayNum() {
            return DAYS.indexOf(this.day) + 1;
        },
        isLeftmost() {
            return this.dayNum === 1;
        },
        isRightMost() {
            return this.dayNum === DAYS.length;
        },
        styles() {
            // Compute what cells this current timetable day cell should span
            return { 
                'grid-column': `${this.cellPrefix}-${this.dayNum}-start / ${this.cellPrefix}-${this.dayNum}-end`,
                'grid-row': '1'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "./timetable-common.scss";

    .TimetableDay {
        border-right: $line-style;
        text-align: center;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        padding: 1rem 0;

        & .TimetableDay__day {

        }
    }
</style>