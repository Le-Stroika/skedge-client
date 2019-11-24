import TimetableGrid from "@/components/timetable/TimetableGrid.vue";

export default {
    title: "Timetable"
};

export const main = () => ({
    components: {
        TimetableGrid
    },
    template: `
        <timetable-grid>
        </timetable-grid>
    `    
});