import v from 'validator';

export const required = (str) => v.isLength(v.trim(str), 1);
export const length = (str, min, max) => v.isLength(str, { min, max });
export const alpha = v.isAlpha;
