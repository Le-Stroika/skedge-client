<template>
    <div class="Demo">
        <div class="Demo__container">
            <div class='Demo__grid-container'>
                <timetable-grid
                    class="Demo__grid"
                >
                    <!-- <timetable-activity
                        v-for="(data, idx) in grid1Data"
                        :key="data.name + data.startTime + data.endTime + '1'"
                        :start-time="data.startTime"
                        :end-time="data.endTime"
                        :day="data.day"
                        :color="data.color"
                    >
                        {{ data.name }}
                    </timetable-activity> -->
                </timetable-grid>
            </div>
            <div class='Demo__grid-container'>
                <!-- <timetable-grid
                    class="Demo__grid"
                >
                    <timetable-activity
                        v-for="(data, idx) in grid2Data"
                        :key="data.name + data.startTime + data.endTime + '2'"
                        :start-time="data.startTime"
                        :end-time="data.endTime"
                        :day="data.day"
                        :color="data.color"
                    >
                        {{ data.name }}
                    </timetable-activity>
                </timetable-grid> -->
            </div>
        </div>
    </div> 
</template>

<script>
import TimetableGrid from "@/components/timetable/grid/TimetableGrid.vue";
import TimetableActivity from "@/components/timetable/TimetableActivity.vue";

export default {
    components: {
        TimetableGrid,
        TimetableActivity
    },
    data() {
        return {
            grid1Data: [
                { name: "CSCB07", startTime: "8:00", endTime: "10:00", day: "Monday", color: "#346789" },
                { name: "CSCB07", startTime: "12:00", endTime: "13:00", day: "Wednesday", color: "#346789" },
                { name: "CSCA08", startTime: "10:00", endTime: "12:00", day: "Monday", color: "#8F65BE" },
                { name: "CSCA08", startTime: "13:00", endTime: "15:00", day: "Thursday", color: "#8F65BE" },
                { name: "CSCC01", startTime: "9:00", endTime: "11:00", day: "Tuesday", color: "#65B2BE" },
                { name: "CSCC01", startTime: "9:00", endTime: "11:00", day: "Thursday", color: "#65B2BE" },
            ],
            grid2Data: [
                { name: "CSCB09", startTime: "14:00", endTime: "16:00", day: "Tuesday", color: "#C67A69" },
                { name: "CSC343", startTime: "10:00", endTime: "13:00", day: "Friday", color: "#77BE65" },
                { name: "MATB24", startTime: "16:00", endTime: "18:30", day: "Tuesday", color: "#BE6565" },
                { name: "MATB24", startTime: "11:00", endTime: "13:00", day: "Wednesday", color: "#BE6565" },
                { name: "CSCB58", startTime: "9:00", endTime: "12:00", day: "Tuesday", color: "#BE9365" },
                { name: "CSCB58", startTime: "14:00", endTime: "15:00", day: "Friday", color: "#BE9365" },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .Demo {
        height: 100%;
        overflow: auto;

        .Demo__container {
            display: flex;
            flex-direction: row;
            // align-content: stretch;
            height: 100%;
            width: 100%;

            box-sizing: border-box;

            & .Demo__grid-container {
                flex-grow: 1;
                flex-shrink: 1;

                display: flex;

                margin: 1rem;
            }

            & .Demo__grid {
                flex-grow: 1;
                flex-shrink: 1;

                width: 100%;
            }
            
            @include respond(tab-land) {
                flex-direction: column;
                height: auto;
                width: 100%;
            }
        }
    }
</style>