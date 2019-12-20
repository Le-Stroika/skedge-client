<template>
    <timetable-grid>
        <!-- Render unconflicted timetable items -->
        <timetable-activity
            v-for="(item, idx) in unconflictedItems"
            :key="item.courseCode + item.startTime + item.endTime + item.day + idx"

            :start-time="item.startTime"
            :end-time="item.endTime"
            :day="item.day"

            :course-code="item.courseCode"
            :activity-name="item.activityName"
            :location="item.location"

            :color="item.color"
            :conflicted="isConflicted(item.courseCode, item.activityName)"
            :disabled="item.disabled"
        >
        </timetable-activity>
        
        <!-- Render each conflicted timetable items within a conflict group -->
        <conflict-group
            v-for="(group, idx) in conflictGroups"
            :key="'' + group.startTime + group.endTime + group.day + idx"
            
            :start-time="group.startTime"
            :end-time="group.endTime"
            :day="group.day"
        >
            <timetable-activity
                v-for="(item, idx) in group.items"
                :key="item.courseCode + item.startTime + item.endTime + item.day + idx"

                :start-time="item.startTime"
                :end-time="item.endTime"
                :day="item.day"

                :course-code="item.courseCode"
                :activity-name="item.activityName"
                :location="item.location"

                :color="item.color"
                :conflicted="isConflicted(item.courseCode, item.activityName)"
                :disabled="item.disabled"
            >
            </timetable-activity>
        </conflict-group>
    </timetable-grid>
</template>

<script>
import TimetableGrid from "@/components/timetable/grid/TimetableGrid.vue";
import TimetableActivity from "@/components/timetable/TimetableActivity.vue";
import ConflictGroup from "@/components/timetable/ConflictGroup.vue";

import { TimetableData, TimetableConflictData } from "../../validators/index";

export default {
    components: {
        TimetableGrid,
        TimetableActivity,
        ConflictGroup
    },
    props: {
        data: {
            type: Array,
            validator: TimetableData,
            default: () => ([])
        }, 
        conflicts: {
            type: Array,
            validator: TimetableConflictData,
            default: () => ([])
        }
    },
    computed: {
        // Format: { 'courseCode-activityName': true }
        conflictMap() {
            const retMap = {};

            this.conflicts.forEach((subArr) => {
                subArr.forEach((idx) => {
                    const currData = this.data[idx];

                    retMap[`${currData.courseCode}-${currData.activityName}`] = true;
                })
            });

            return retMap;
        },
        unconflictedItems() {
            return this.data.filter((_, idx) => {
                for (let i=0; i < this.conflicts.length; i++) {
                    const currIdxList = this.conflicts[i];

                    if (currIdxList.includes(idx)) {
                        return false;
                    }
                }

                return true;
            });
        },
        // Format: [ { items: [data items], startTime: int, endTime: int, day: int } ]
        conflictGroups() {
            // For each conflict group
            return this.conflicts.map(conflictIdxs => {
                let startTime = 0;
                let endTime = 0;
                let day = 0;
                const items = [];

                // For each data index in the conflict group
                conflictIdxs.forEach(idx => {
                    const currItem = this.data[idx];

                    // Find earlest start time and latest end time of the conflict group
                    startTime = (currItem.startTime < startTime) ? currItem.startTime : startTime;
                    endTime = (currItem.endTime > endTime) ? currItem.endTime : endTime;

                    day = currItem.day;

                    items.push(currItem);
                });

                return {
                    items,
                    startTime, 
                    endTime,
                    day
                }
            });
        }
    },
    methods: {
        isConflicted(courseCode, activityName) {
            return !!this.conflictMap[`${courseCode}-${activityName}`];
        }
    },
    mounted() {
        console.log(this.conflictGroups);
    }
}
</script>

<style lang="scss" scoped>

</style>