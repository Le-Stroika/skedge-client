import TimetableGrid from "@/components/timetable/grid/TimetableGrid.vue";
import TimetableActivity from "@/components/timetable/TimetableActivity.vue";

import { 
    toStartTimeIndex as toStart, 
    toEndTimeIndex as toEnd,
    toDayIndex as toDay
} from "../src/utilities/timetable";

export default {
    title: "Timetable Grid"
};

export const empty = () => ({
    components: {
        TimetableGrid
    },
    template: `
        <timetable-grid>
        </timetable-grid>
    `
});

export const withItems = () => ({
    components: {
        TimetableGrid,
        TimetableActivity
    },
    data() {
        return {
            gridData: [
                { name: "CSCB07", startTime: "8:00", endTime: "10:00", day: "Monday", color: "#346789" },
                { name: "CSCB07", startTime: "12:00", endTime: "13:00", day: "Wednesday", color: "#346789" },
                { name: "CSCA08", startTime: "10:00", endTime: "12:00", day: "Monday", color: "#8F65BE" },
                { name: "CSCA08", startTime: "13:00", endTime: "15:00", day: "Thursday", color: "#8F65BE" },
                { name: "CSCC01", startTime: "9:00", endTime: "11:00", day: "Tuesday", color: "#65B2BE" },
                { name: "CSCC01", startTime: "9:00", endTime: "11:00", day: "Thursday", color: "#65B2BE" },
            ],
            toStart,
            toEnd,
            toDay
        }
    },
    template: `
        <timetable-grid>
            <timetable-activity
                v-for="(data, idx) in gridData"
                :key="data.name + data.startTime + data.endTime + data.day"
                :start-time="toStart(data.startTime)"
                :end-time="toEnd(data.endTime)"
                :day="toDay(data.day)"
                :color="data.color"
            >
                {{ data.name }}
            </timetable-activity>
        </timetable-grid>
    `
});