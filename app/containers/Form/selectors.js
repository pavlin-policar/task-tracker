import { createSelector } from 'reselect';
import { Map } from 'immutable';


/**
 * Direct selector to the todos state domain
 */
export const getFormsDomain = () => (state) => state.get('forms');

/**
 * Other specific selectors
 */

export const getForm = (id) => createSelector(
  getFormsDomain(),
  forms => forms.get(id) || Map()
);

export const getFormFields = (id) => createSelector(
  getForm(id),
  form => form.get('fields') || Map()
);
export const getFormValues = (id) => createSelector(
  getFormFields(id),
  fields => fields.map(f => f.get('value')) || Map()
);
export const getFormErrors = (id) => createSelector(
  getFormFields(id),
  fields => fields.map(f => f.get('errors')) || Map()
);
export const getFormIsValid = (id) => createSelector(
  getForm(id),
  form => (form.isValid && form.isValid()) || false
);

// Field selectors
export const getFieldValue = (id, name) => createSelector(
  getFormValues(id),
  values => values.get(name) || ''
);


export default getForm;
