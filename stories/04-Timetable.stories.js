import Timetable from "@/components/timetable/Timetable.vue";

import { 
    toStartTimeIndex as toStart, 
    toEndTimeIndex as toEnd,
    toDayIndex as toDay
} from "../src/utilities/timetable";


export default {
    title: "Timetable"
};

export const main = () => ({
    components: {
        Timetable
    },
    data() {
        return {
            data: [
                { 
                    courseCode: "CSCB07", 
                    activityName: "LEC 01",
                    location: "IC 130",
                    startTime: toStart("8:00"), 
                    endTime: toEnd("10:00"), 
                    day: toDay("Monday"), 
                    color: "#346789" 
                },
                { 
                    courseCode: "CSCB07", 
                    activityName: "TUT 0003",
                    location: "BV 473",
                    startTime: toStart("12:00"), 
                    endTime: toEnd("13:00"), 
                    day: toDay("Wednesday"), 
                    color: "#346789" 
                },
                { 
                    courseCode: "CSCA08", 
                    activityName: "LEC 02",
                    location: "SW 319",
                    startTime: toStart("9:00"), 
                    endTime: toEnd("12:00"), 
                    day: toDay("Monday"), 
                    color: "#8F65BE" 
                },
                { 
                    courseCode: "CSCA08", 
                    activityName: "TUT 0001",
                    location: "IC 212",
                    startTime: toStart("13:00"), 
                    endTime: toEnd("15:00"), 
                    day: toDay("Thursday"), 
                    color: "#8F65BE" 
                },
                { 
                    courseCode: "CSCC01", 
                    activityName: "LEC 01",
                    location: "HL 0001",
                    startTime: toStart("9:00"), 
                    endTime: toEnd("11:00"), 
                    day: toDay("Tuesday"), 
                    color: "#65B2BE" 
                },
                { 
                    courseCode: "CSCC01", 
                    activityName: "PRA 0001",
                    location: "BV 473",
                    startTime: toStart("9:00"), 
                    endTime: toEnd("11:00"), 
                    day: toDay("Thursday"), 
                    color: "#65B2BE" 
                },
                { 
                    courseCode: "CSCB07", 
                    activityName: "LEC 01",
                    location: "IC 130",
                    startTime: toStart("12:00"), 
                    endTime: toEnd("13:00"), 
                    day: toDay("Friday"), 
                    color: "#346789" 
                },
            ],
            conflicts: [
                [0, 2] // Indexes of items in data list
            ]
        }
    },
    template: `
        <timetable
            :data="data"
            :conflicts="conflicts"
        >
        </timetable>
    `
});