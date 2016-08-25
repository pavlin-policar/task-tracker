import v from 'validator';

/**
 * Simple validations
 */

export const required = (str) => v.isLength(v.trim(str), 1);
export const length = (str, min, max) => v.isLength(str, { min, max });
export const alpha = (str) => v.matches(str, /^[A-Za-z ČŠŽčšž]*$/u);
export const alphaDash = (str) => v.matches(str, /^[A-Za-z- ČŠŽčšž]*$/u);

/**
 * Complex validations
 */

export const sameAs = () => true;
