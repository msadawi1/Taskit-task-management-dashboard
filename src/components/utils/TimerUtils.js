// DurationUtils.js

/**
 * Convert a duration in s into { hours, minutes, seconds }
 * @param {number} s - duration in seconds
 * @returns {{hours: number, minutes: number, seconds: number}}
 */
export function decodeSeconds(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
}

/**
 * Convert hours, minutes, seconds into duration in s
 * @param {number} hours 
 * @param {number} minutes 
 * @param {number} seconds 
 * @returns {number} duration in s
 */
export function encodeDuration(hours, minutes, seconds) {
    return (hours * 3600 + minutes * 60 + seconds);
}
