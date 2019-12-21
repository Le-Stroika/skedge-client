<template>
    <div 
        class="TimetableItem"
        :style="computedStyles"
    >
        <slot></slot>
    </div>
</template>

<script>
import { 
    START_HOUR, END_HOUR, HOURLY_BREAKUP,
    START_DOW, END_DOW 
} from "../../constants/timetable";

const MAX_TIME_INDEX = (END_HOUR - START_HOUR) * HOURLY_BREAKUP;

export default {
    props: {
        // Position data
        startTime: {
            type: Number,
            validator(val) {
                return val >= 0 && val < MAX_TIME_INDEX;
            },
            required: true
        },
        endTime: {
            type: Number,
            validator(val) {
                return val >= 0 && val < MAX_TIME_INDEX;
            },
            required: true
        },
        day: {
            type: Number, 
            validator(val) {
                return val >= START_DOW && val <= END_DOW; // Monday - Friday
            },
            required: true
        },
        // Other
        cellPrefix: {
            type: String,
            default: "slot"
        },
        computeGridColumn: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        computedStyles() {
            const startRow = `${this.cellPrefix}-${this.startTime + 1}-start`;
            const endRow = `${this.cellPrefix}-${this.endTime + 1}-end`;

            const startCol = `${this.cellPrefix}-${this.day}-start`;
            const endCol = `${this.cellPrefix}-${this.day}-end`;

            return {
                'grid-column': (this.computeGridColumn) ? `${startCol} / ${endCol}` : null,
                'grid-row': `${startRow} / ${endRow}`,
                'background-color': this.color
            }
        }
    }
}
</script>