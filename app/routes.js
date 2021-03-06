// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/register',
      name: 'register',
      getComponent(nextState, cb) {
        System.import('containers/Pages/RegistrationPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        System.import('containers/Pages/LoginPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/logout',
      name: 'logout',
      getComponent(nextState, cb) {
        System.import('containers/Pages/LogoutPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/todos',
      name: 'todos',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Todos/reducer'),
          System.import('containers/Todos/sagas'),
          System.import('containers/Pages/TodosPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('todos', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/401',
      name: '401-unauthorized',
      getComponent(nextState, cb) {
        System.import('containers/401')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: '404-not-found',
      getComponent(nextState, cb) {
        System.import('containers/404')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
