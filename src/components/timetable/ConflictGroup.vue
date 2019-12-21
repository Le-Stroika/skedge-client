<template>
    <timetable-item 
        class="ConflictGroup"
        :style="computedStyles"

        :start-time="startTime"
        :end-time="endTime"
        :cell-prefix="cellPrefix"
        v-bind="$attrs"
    >
        <slot></slot>
    </timetable-item>
</template>

<script>
import { CSSGridFunc, CSSGridLength } from "../../validators";
import TimetableItem from "@/components/timetable/TimetableItem.vue";

import { 
    START_HOUR, END_HOUR, HOURLY_BREAKUP
} from "../../constants/timetable";

const MAX_TIME_INDEX = (END_HOUR - START_HOUR) * HOURLY_BREAKUP;

export default {
    components: {
        TimetableItem
    },
    props: {
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
        cellPrefix: {
            type: String,
            default: "slot"
        },
        cellHeight: {
            type: String,
            default: "15rem",
            validator: (val) => CSSGridLength(val) || CSSGridFunc(val)
        },
    },
    computed: {
        computedStyles() {
            return {
                "grid-template-rows": this.templateRows(this.cellPrefix)
            };
        },
        templateRows() {
            return (cellPrefix) => {
                let templateStr = "[";

                for (let cellNum = this.startTime + 1; cellNum <= this.endTime + 1; cellNum++) {
                    const cellName = `${cellPrefix}-${cellNum}`;
                    templateStr += `${cellName}-start] ${this.cellHeight} [${cellName}-end `;
                }

                templateStr += "]";

                return templateStr;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .ConflictGroup {
        display: grid;
    }
</style>