// DurationUtils.js

/**
 * Convert a duration in ms into { hours, minutes, seconds }
 * @param {number} ms - duration in milliseconds
 * @returns {{hours: number, minutes: number, seconds: number}}
 */
export function decodeDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
}

/**
 * Convert hours, minutes, seconds into duration in ms
 * @param {number} hours 
 * @param {number} minutes 
 * @param {number} seconds 
 * @returns {number} duration in ms
 */
export function encodeDuration(hours, minutes, seconds) {
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
}
