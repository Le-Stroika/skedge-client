<template>
    <div
        :class="[
            'TimetableDay', 
            (this.isLeftmost) ? 'leftmost' : null,
            (this.isRightMost) ? 'rightmost' : null
        ]"
        :style="styles"
    >
        {{ day }}
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

</style>