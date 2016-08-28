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
  form => form.get('fields')
);

export default getForm;
