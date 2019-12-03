<template>
    <div class="Demo">
        <div class="Demo__container">
            <div class='Demo__grid-container'>
                <timetable-grid
                    class="Demo__grid"
                >
                </timetable-grid>
            </div>
            <div class='Demo__grid-container'>
                <timetable-grid
                    class="Demo__grid"
                >
                </timetable-grid>
            </div>
        </div>
    </div> 
</template>

<script>
import TimetableGrid from "@/components/timetable/grid/TimetableGrid.vue";

export default {
    components: {
        TimetableGrid
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