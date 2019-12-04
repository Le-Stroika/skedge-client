<template>
    <div 
        class="TimetableItem" 
        :style="computedStyles"
    >
        <slot></slot>
   </div>
</template>

<script>
// TODO: do not hardcode this
const START_TIME_MAPPINS = {
    "8:00": 1,
    "8:30": 2,
    "9:00": 3,
    "9:30": 4,
    "10:00": 5,
    "10:30": 6,
    "11:00": 7,
    "11:30": 8,
    "12:00": 9,
    "12:30": 10,
    "13:00": 11,
    "13:30": 12,
    "14:00": 13,
    "14:30": 14,
    "15:00": 15,
    "15:30": 16,
    "16:00": 17,
    "16:30": 18,
    "17:00": 19,
    "17:30": 20,
    "18:00": 21,
    "18:30": 22,
    "19:00": 23,
    "19:30": 24,
    "20:00": 25,
    "20:30": 26,
    "21:00": 27,
    "21:30": 28
};

const END_TIME_MAPPINS = {
    "8:30": 1,
    "9:00": 2,
    "9:30": 3,
    "10:00": 4,
    "10:30": 5,
    "11:00": 6,
    "11:30": 7,
    "12:00": 8,
    "12:30": 9,
    "13:00": 10,
    "13:30": 11,
    "14:00": 12,
    "14:30": 13,
    "15:00": 14,
    "15:30": 15,
    "16:00": 16,
    "16:30": 17,
    "17:00": 18,
    "17:30": 19,
    "18:00": 20,
    "18:30": 21,
    "19:00": 22,
    "19:30": 23,
    "20:00": 24,
    "20:30": 25,
    "21:00": 26,
    "21:30": 27,
    "22:00": 28
};

const DAY_MAPPINGS = {
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5
};

export default {
    props: {
        startTime: {
            type: String,
            required: true, // TODO: do this properly
        },
        endTime: {
            type: String,
            required: true, // TODO: do this properly
        },
        day: {
            type: String, 
            required: true // TODO: do this properly
        },
        cellPrefix: {
            type: String,
            default: "slot" // TODO: don't hardcode
        },
        color: {
            type: String,
            default: "#346789" // TODO: do this properly
        }
    },
    computed: {
        computedStyles() {
            const startRow = `${this.cellPrefix}-${START_TIME_MAPPINS[this.startTime]}-start`;
            const endRow = `${this.cellPrefix}-${END_TIME_MAPPINS[this.endTime]}-end`;

            const startCol = `${this.cellPrefix}-${DAY_MAPPINGS[this.day]}-start`;
            const endCol = `${this.cellPrefix}-${DAY_MAPPINGS[this.day]}-end`;

            return {
                'grid-column': `${startCol} / ${endCol}`,
                'grid-row': `${startRow} / ${endRow}`,
                'background-color': this.color
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .TimetableItem {
        z-index: 1;

        border-radius: 0.3rem;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>