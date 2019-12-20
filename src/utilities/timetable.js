import { START_HOUR, END_HOUR, HOURLY_BREAKUP } from "../../src/constants/timetable";

function _generateTimeMappings() {
    const startDateMappings = {};
    const endDateMappings = {};
    let currIdx = 0;

    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
        const minuteIncrement = 60 / HOURLY_BREAKUP;

        for (let minute = 0; minute < 60; minute += minuteIncrement) {
            // Set start date mappings
            const paddedStartMinute = `${minute}`.padStart(2, "0");
            startDateMappings[`${hour}:${paddedStartMinute}`] = currIdx;


            // Increment the date by one minute increment (30 minutes)
            const incremDate = new Date(1970, 1, 1, hour, minute, 0, 0);
            incremDate.setMinutes(incremDate.getMinutes() + minuteIncrement);

            // Set end date mappings
            const paddingEndMinute = `${incremDate.getMinutes()}`.padStart(2, "0");
            endDateMappings[`${incremDate.getHours()}:${paddingEndMinute}`] = currIdx;

            currIdx++;
        }
    }

    return { startDateMappings, endDateMappings };
}

const { startDateMappings: START_DATE_MAPPINGS, endDateMappings: END_DATE_MAPPINGS } = _generateTimeMappings();

const DATE_LIST = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


/**
 * Converts a time string to the start time index system used by the timetable item component.
 * 
 * @param {String} timeStr 24-hour time string. Range: '8:00' - '21:30'
 */
export function toStartTimeIndex(timeStr) {
    return START_DATE_MAPPINGS[timeStr];
}

/**
 * Converts a time string to the end time index system used by the timetable item component.
 * 
 * @param {String} timeStr 24-hour time string. Range: '8:30' - '22:00'
 */
export function toEndTimeIndex(timeStr) {
    return END_DATE_MAPPINGS[timeStr];
}

/**
 * Converts the day string to the day index.
 * 
 * @param {String} dayStr The day string. e.g. 'Monday', 'Tuesday, etc
 */
export function toDayIndex(dayStr) {
    return DATE_LIST.indexOf(dayStr);
}