// redux
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ReducerManager from './helpers/ReducerManager';
// import { composeWithDevTools } from 'remote-redux-devtools';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

export const defaultOptions = {
  rootReducer: (state = {}) => state,
  startingSaga: [],
};

export default class Store {
  constructor({
    startingSaga = defaultOptions.startingSaga,
    preloadedState = {},
    sagaMonitor,
  } = defaultOptions) {
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    const middleware = [sagaMiddleware];

    const reducerManager = new ReducerManager();
    this.sagaTotasksMap = new Map();
    // const composeEnhancers = composeWithDevTools(
    //   {
    //     name: 'configuration agent',
    //     hostname: 'localhost',
    //     maxAge: 20,
    //     realtime: true,
    //     port: 8000,
    //   });

    let store = createStore(
      reducerManager.reducer,
      preloadedState,
      compose(
        applyMiddleware(...middleware),
        // other store enhancers if any
      ),
    );

    if (isDebuggingInChrome) {
      window.store = store;
    }

    // the current instance become the store we just created (we added run saga fct)
    store = Object.assign(
      this,
      store,
      {
        run: sagaMiddleware.run,
        addReducersTree: reducerManager.addReducersTree,
        removeReducersTree: reducerManager.removeReducersTree,
      },
    );

    // start all sagas
    startingSaga.forEach(saga => store.run(saga));
  }

  registerBusiness(business) {
    this.addReducersTree(...business.reducersTrees);
    business.sagas.forEach(saga => this.sagaTotasksMap.set(saga, this.run(saga)));
  }

  unregisterBusiness(business) {
    this.removeReducersTree(...business.reducersTrees);
    business.sagas.forEach(saga => this.sagaTotasksMap.delete(this.run(saga)));
  }
}
