/*
 * FormElement Messages
 *
 * This contains all the text for the FormElement component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  required: {
    id: 'app.containers.FormElement.required',
    defaultMessage: 'This field is required.',
  },
  length: {
    id: 'app.containers.FormElement.length',
    defaultMessage: 'This text you input doesn\'t match the required length.',
  },
  sameAs: {
    id: 'app.containers.FormElement.sameAs',
    defaultMessage: 'This field does not match its counterpart.',
  },
});
