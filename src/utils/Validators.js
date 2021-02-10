import Logger from "./Logger";

export function validateNumber(value) {
    Logger.trace("validating correct number", value);
    if (/^\d*$/.test(value)) {
        return null;
    }
    return "Not valid integer value"
}

export function validateRange(min, max) {
    return (value) => {
        if ((!min || value >= min) && (!max || value <= max)) {
            return null;
        }
        return "Provided number not in range " + min + " to " + max;
    };
}

export function validateNotEmpty(value) {
    return (value && value !== "") ? null : "Empty value not allowed";
}
