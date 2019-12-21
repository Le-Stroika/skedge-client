<template>
    <grid-base 
        class="TimetableGrid"
        :cells-wide="days.length"
        :cells-high="times.length * cellsPerTime"
        cell-width="minmax(10rem, 1fr)"
        :cell-height="cellHeight"

        :enable-horizontal-legend="true"
        :enable-vertical-legend="true"
        vertical-legend-width="auto"
        horizontal-legend-height="auto"
        :lock-horizontal-legend="true"
        :lock-vertical-legend="true"

        :cell-prefix="cellPrefix"
        :horizontal-legend-prefix="horizontalLegendPrefix"
        :vertical-legend-prefix="verticalLegendPrefix"

        horizontal-legend-class="TimetableGrid__horizontal-legend"
        vertical-legend-class="TimetableGrid__vertical-legend"
        corner-cell-class="TimetableGrid__corner-cell"
        grid-class="TimetableGrid__grid"
        content-class="TimetableGrid__content"
    >
        <template #horizontal-legend>
            <timetable-day-cell
                v-for="(day, idx) in days"
                :key="idx"
                :day="day"
                :days-list="days"
                :cell-prefix="horizontalLegendPrefix"
            >
            </timetable-day-cell>
        </template>

        <template #vertical-legend>
            <timetable-time-cell
                v-for="(time, idx) in times"
                :key="idx"
                :time="time"
                :times-list="times"
                :cell-prefix="verticalLegendPrefix"
                :cells-per-time="cellsPerTime"
            ></timetable-time-cell>
        </template>

        <template>
            <!-- Passthrough the cell items -->
            <slot></slot>

            <!-- Generate timetable background cells -->
            <timetable-cell
                v-for="n in (times.length * days.length)"
                :key="n"
                :cell-num="n"
                :cell-prefix="cellPrefix"
                :cells-wide="days.length"
                :cells-high="times.length"
                :cell-width="1"
                :cell-height="hourlyBreakup"
            >
            </timetable-cell>
        </template>
    </grid-base>
</template>

<script>
import { CSSGridFunc, CSSGridLength } from "../../../validators";
import { HOUR_LIST as TIMES, DAY_LIST_FULL as DAYS, HOURLY_BREAKUP } from "../../../constants/timetable";

import GridBase from "@/components/grid/GridBase.vue";

import TimetableDayCell from "@/components/timetable/grid/TimetableDayCell.vue";
import TimetableTimeCell from "@/components/timetable/grid/TimetableTimeCell.vue";
import TimetableCell from "@/components/timetable/grid/TimetableCell.vue";

// TODO: implement responsive day string list shortening

export default {
    components: {
        GridBase,
        TimetableDayCell,
        TimetableTimeCell,
        TimetableCell
    },
    props: {
        cellPrefix: {
            type: String,
            default: "slot"
        },
        horizontalLegendPrefix: {
            type: String,
            default: "day"
        },
        verticalLegendPrefix: {
            type: String,
            default: "time"
        },
        cellHeight: {
            type: String,
            default: "15rem",
            validator: (val) => CSSGridLength(val) || CSSGridFunc(val)
        },
    },
    data() {
        return {
            days: [ ...DAYS ],
            times: [ ...TIMES ],
            hourlyBreakup: HOURLY_BREAKUP,
            cellsPerTime: 2 // The number of cells per every time-slot
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
            // border-bottom: 1px solid rgba(0, 0, 0, 0.637); // TODO: style
            border-bottom: $line-style;

            background-color: color-link('TimetableGrid', 'background_color', 'primary');
        }

        & /deep/ .TimetableGrid__vertical-legend {
            border-right: $line-style;

            background-color: color-link('TimetableGrid', 'background_color', 'primary');
        }

        & /deep/ .TimetableGrid__corner-cell {
            // border-bottom: 1px solid rgba(0, 0, 0, 0.637); // TODO: style
            border-bottom: $line-style;
            border-right: $line-style;

            background-color: color-link('TimetableGrid', 'background_color', 'primary');
        }

        & /deep/ .TimetableGrid__grid {
            // background-color: yellowgreen;
            
        }

        & /deep/ .TimetableGrid__content {

        }
    }
</style>