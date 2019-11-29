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

        horizontal-legend-class="TimetableGrid__horizontal-legend"
        vertical-legend-class="TimetableGrid__vertical-legend"
        grid-class="TimetableGrid__grid"
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

        <template>
            <!-- Passthrough the cell items -->
            <slot></slot>

            <!-- Generate timetable cells -->
            <timetable-cell
                v-for="n in (times.length * days.length)"
                :key="n"
                :cell-num="n"
                :cell-prefix="cellPrefix"
                :cells-wide="days.length"
                :cells-high="times.length"
                :cell-width="1"
                :cell-height="2"
            >
            </timetable-cell>
        </template>
    </grid-base>
</template>

<script>
import GridBase from "@/components/grid/GridBase.vue";

import TimetableDay from "@/components/timetable/TimetableDay.vue";
import TimetableTime from "@/components/timetable/TimetableTime.vue";
import TimetableCell from "@/components/timetable/TimetableCell.vue";

// TODO: try not to hardcode this in
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIMES = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
                "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

export default {
    components: {
        GridBase,
        TimetableDay,
        TimetableTime,
        TimetableCell
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

<style lang="scss" scoped>
    @import "./timetable-common.scss";

    $rount-amt: 0.3rem;

    .TimetableGrid {
        background-color: color-link('TimetableGrid', 'background_color', 'primary');
        
        border-radius: $rount-amt;

        overflow: hidden;

        & /deep/ .TimetableGrid__horizontal-legend {
            border-bottom: 1px solid rgba(0, 0, 0, 0.637); // TODO: style
        }

        & /deep/ .TimetableGrid__vertical-legend {
            border-right: $line-style;
        }

        & /deep/ .TimetableGrid__grid {
            // background-color: yellowgreen;
        }
    }
</style>