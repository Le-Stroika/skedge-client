<template>
    <timetable-item 
        class="ConflictGroup"
        v-bind="$attrs"
    >
        <slot></slot>
    </timetable-item>
</template>

<script>
import TimetableItem from "@/components/timetable/TimetableItem.vue";

export default {
    components: {
        TimetableItem
    },
    props: {
        
    },
    computed: {
    }
}
</script>

<style lang="scss" scoped>
    .ConflictGroup {

    }
</style>