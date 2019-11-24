<template>
    <div
        class="TimetableTime"
        :style="styles"
    >
        {{ time }}
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
        styles() {
            // Compute what cells this current timetable time cell should span
            const timeNum = (TIMES.indexOf(this.time) * this.cellsPerTime) + 1; 

            return { 
                'grid-column': '1',
                'grid-row': `${this.cellPrefix}-${timeNum}-start 
                            / ${this.cellPrefix}-${timeNum + this.cellsPerTime - 1}-end`
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>