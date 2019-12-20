<template>
    <timetable-item 
        class="TimetableActivity" 
        :style="computedStyles"
        v-bind="$attrs"
    >
        {{ courseCode}}
        <br>
        {{ activityName }}
        <br>
        {{ location}}
        <br>
        {{ conflicted }}
   </timetable-item>
</template>

<script>
import TimetableItem from "@/components/timetable/TimetableItem.vue";

export default {
    components: {
        TimetableItem
    },
    props: {
        // Display data
        courseCode: {
            type: String,
            required: true,
        },
        activityName: {
            type: String,
            required: true
        },
        location: {
            type: String,
            default: null
        },
        // State data
        conflicted: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: null
        }
    },
    computed: {
        computedStyles() {
            return {
                'background-color': this.color
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .TimetableActivity {
        z-index: 1;

        border-radius: 0.3rem;

        display: flex;
        justify-content: center;
        align-items: center;

        // TODO: style properly
        // TODO: add default color style (color prop doesn't get applied if it is null)
    }
</style>