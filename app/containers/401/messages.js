/*
 * Unauthorized Messages
 *
 * This contains all the text for the Unauthorized component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.Unauthorized.header',
    defaultMessage: 'You are not allowed here!',
  },
  helpText: {
    id: 'app.components.Unauthorized.helpText',
    defaultMessage: 'You have reached the 401 page. You are not allowed to access the content on this page. You might not be logged in or are missing the permissions required to access this page.',
  },
});
