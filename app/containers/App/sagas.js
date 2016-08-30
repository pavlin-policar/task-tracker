import authenticationSagas from 'containers/Authentication/sagas';
import formSagas from 'containers/Form/sagas';

/**
 * Only specify sagas that are crucial and are needed everywhere to control the
 * application flow.
 */
export default [
  ...authenticationSagas,
  ...formSagas,
];
