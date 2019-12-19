// --- Time constants ---
export const START_HOUR = 8; // 8:00 AM
export const END_HOUR = 22; // 10:00 PM

// 1 => each hour only has 1hr segments
// 2 => each hour has 30min segments
// 4 => each hour has 15min segments
// ...etc
export const HOURLY_BREAKUP = 2; 

// The list of formatted hour strings
export const HOUR_LIST = (function() {
    const hourStrList = [];

    for (let i = START_HOUR; i < END_HOUR; i++) {
        const currHourStr = `${i}:00`;
        hourStrList.push(currHourStr);
    }

    return hourStrList;
})();

// --- Date constants ---

// Day of Week integer legend:
// 0 - Sunday
// 1 - Monday
// 2 - Tuesday
// 3 - Wednesday
// 4 - Thursday
// 5 - Friday
// 6 - Saturday

export const START_DOW = 1; // Monday
export const END_DOW = 5; // Friday

// Generates a day list with the given day string values
function _generateDayList(dayValues, startDow = START_DOW, endDoW = END_DOW) {
    const dayStrList = [];

    for (let i = startDow; i <= endDoW; i++) {
        dayStrList.push(dayValues[i]);
    }

    return dayStrList;
}

// List of formatted full day strings
export const DAY_LIST_FULL = (function() {
    const dayValues = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return _generateDayList(dayValues, START_DOW, END_DOW);
})();

// List of formatted shortened day strings
export const DAY_LIST_SHORT = (function() {
    const dayValues = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return _generateDayList(dayValues, START_DOW, END_DOW);
})();

// List of formatted single character day strings
export const DAY_LIST_SINGLE = (function() {
    const dayValues = ["S", "M", "T", "W", "T", "F", "S"];
    return _generateDayList(dayValues, START_DOW, END_DOW);
})();