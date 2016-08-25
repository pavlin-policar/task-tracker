import v from 'validator';

export const required = (str) => v.isLength(v.trim(str), 1);
export const length = v.isLength;
export const alpha = v.isAlpha;
