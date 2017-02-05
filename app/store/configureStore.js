// redux
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';
// reducers
import reducers from '../reducers';
// sagas
import sagas from '../sagas';
import sagaMonitor from '../sagas/sagaMonitor';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const middleware = [sagaMiddleware];

  const composeEnhancers = composeWithDevTools(
    {
      name: 'configuration agent',
      hostname: 'localhost',
      maxAge: 20,
      realtime: true,
      port: 8000,
    });

  const store = createStore(reducers, /* preloadedState, */ compose(
    applyMiddleware(...middleware),
    // other store enhancers if any
  ));

  if (isDebuggingInChrome) {
    window.store = store;
  }

  sagaMiddleware.run(sagas);

  return store;
}
