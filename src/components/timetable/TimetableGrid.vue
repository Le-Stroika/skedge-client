<template>
    <grid-base 
        class="TimetableGrid"
        :cells-wide="days.length"
        :cells-high="times.length * cellsPerTime"
        cell-width="minmax(13rem, 1fr)"
        cell-height="3rem"

        :enable-horizontal-legend="true"
        :enable-vertical-legend="true"
        vertical-legend-width="auto"
        horizontal-legend-height="auto"
        :lock-horizontal-legend="true"

        :cell-prefix="cellPrefix"
        :horizontal-legend-prefix="horizontalLegendPrefix"
        :vertical-legend-prefix="verticalLegendPrefix"
    >
        <template #horizontal-legend>
            <timetable-day
                v-for="(day, idx) in days"
                :key="idx"
                :day="day"
                :cell-prefix="horizontalLegendPrefix"
            >
            </timetable-day>
        </template>

        <template #vertical-legend>
            <timetable-time
                v-for="(time, idx) in times"
                :key="idx"
                :time="time"
                :cell-prefix="verticalLegendPrefix"
                :cells-per-time="cellsPerTime"
            ></timetable-time>
        </template>

        <!-- Passthrough the cell items -->
        <template>
            <slot></slot>
        </template>
    </grid-base>
</template>

<script>
import GridBase from "@/components/grid/GridBase.vue";

import TimetableDay from "@/components/timetable/TimetableDay.vue";
import TimetableTime from "@/components/timetable/TimetableTime.vue";

// TODO: try not to hardcode this in
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIMES = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
                "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

export default {
    components: {
        GridBase,
        TimetableDay,
        TimetableTime
    },
    data() {
        return {
            days: [ ...DAYS ],
            times: [ ...TIMES ],
            cellsPerTime: 2, // The number of cells per every time-slot
            cellPrefix: "slot",
            horizontalLegendPrefix: "day",
            verticalLegendPrefix: "time"
        }
    }
}
</script>

<style lang="sass">

</style>