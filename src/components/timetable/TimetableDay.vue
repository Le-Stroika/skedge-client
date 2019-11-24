<template>
    <div
        class="TimetableDay"
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
        styles() {
            // Compute what cells this current timetable day cell should span
            const dayNum = DAYS.indexOf(this.day) + 1;

            return { 
                'grid-column': `${this.cellPrefix}-${dayNum}-start / ${this.cellPrefix}-${dayNum}-end`,
                'grid-row': '1'
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>