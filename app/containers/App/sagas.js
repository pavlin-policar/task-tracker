import authenticationSagas from 'containers/Authentication/sagas';
import { formSagas } from '@policar/react-redux-form';

/**
 * Only specify sagas that are crucial and are needed everywhere to control the
 * application flow.
 */
export default [
  ...authenticationSagas,
  ...formSagas,
];
