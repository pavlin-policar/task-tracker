import v from 'validator';
import { eq } from 'lodash';

/**
 * Simple validations
 */

export const required = (str) => v.isLength(v.trim(str), 1);
export const length = (str, [min, max]) => v.isLength(str, { min, max });
export const alpha = (str) => v.matches(str, /^[A-Za-z ČŠŽčšž]*$/u);
export const alphaDash = (str) => v.matches(str, /^[A-Za-z- ČŠŽčšž]*$/u);

/**
 * Validations with other fields
 */

export const sameAs = (str, [same], formData) => eq(str, formData[same]);
