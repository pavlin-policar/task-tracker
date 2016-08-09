import { Schema, arrayOf } from 'normalizr';


/**
 * Todos schema
 */

export const todo = new Schema('todos');
export const todos = arrayOf(todo);
