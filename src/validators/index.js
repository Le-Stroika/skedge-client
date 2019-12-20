import * as Utilities from "../utilities";
import Joi from "@hapi/joi";
import { 
    START_HOUR, 
    END_HOUR, 
    HOURLY_BREAKUP,
    START_DOW,
    END_DOW
} from "../constants/timetable";

const MAX_TIME_INDEX = (END_HOUR - START_HOUR) * HOURLY_BREAKUP;

// Custom Vue types for props

export const CSSLength = val => Utilities.isCSSLength(val);
export const CSSRotation = val => Utilities.isCSSRotation(val);
export const Direction = val => Utilities.isDirection(val);
export const CSSGridLength = val => Utilities.isCSSLength(val) 
                                    || Utilities.isCSSFrUnit(val);

// minmax or fit-content functions
export const CSSGridFunc = val => {
    const rMinMax = /^minmax\(([\d|\w|%|-]+),\s?([\d|\w|%|-]+)\)$/gm;
    const rFitContent = /^fit-content\(([\d|\w|%|-]+)\)/gm;

    const minMaxMatch = rMinMax.exec(val);
    const fitContentMatch = rFitContent.exec(val);

    return (minMaxMatch || fitContentMatch);
}

export const PositiveNumber = val => val > 0;
export const ZeroNumber = val => val === 0;
export const NegativeNumber = val => val < 0;

export const TimetableData = val => {
    const schema = Joi.array().items(
        Joi.object({
            courseCode: Joi.string(), // e.g. "CSCA08"
            activityName: Joi.string(), // e.g. "LEC 01"
            location: Joi.string().optional(), // e.g. "IC 130"
            startTime: Joi.number().min(0).max(MAX_TIME_INDEX),
            endTime: Joi.number().min(0).max(MAX_TIME_INDEX),
            day: Joi.number().min(START_DOW).max(END_DOW),
            color: Joi.string(), // TODO: add color validation
            disabled: Joi.bool().optional().default(false),
        })
    );

    const { error } = schema.validate(val);
    return !error;
};

export const TimetableConflictData = val => {
    const schema = Joi.array().items(
        Joi.array().items(
            Joi.number().min(0)
        )
    );

    const { error } = schema.validate(val);
    return !error;
}