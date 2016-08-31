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
  alpha: {
    id: 'app.containers.FormElement.alpha',
    defaultMessage: 'This text you input contains invalid characters',
  },
  alphaDash: {
    id: 'app.containers.FormElement.alphaDash',
    defaultMessage: 'This text you input contains invalid characters',
  },
  sameAs: {
    id: 'app.containers.FormElement.sameAs',
    defaultMessage: 'This field does not match its counterpart.',
  },
  email: {
    id: 'app.containers.FormElement.email',
    defaultMessage: 'This field is not a valid email.',
  },
  emailUnique: {
    id: 'app.containers.FormElement.emailUnique',
    defaultMessage: 'The email you have provided is already in use.',
  },
});
