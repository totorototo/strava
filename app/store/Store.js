import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "remote-redux-devtools";
import deeplink from "./deeplink";

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

export const defaultOptions = {
  rootReducer: (state = {}) => state,
  startingSaga: []
};

export default class Store {
  constructor(
    {
      rootReducer = defaultOptions.rootReducer,
      startingSaga = defaultOptions.startingSaga,
      sagaMonitor
    } = defaultOptions
  ) {
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    const middleware = [sagaMiddleware];

    const composeEnhancers = composeWithDevTools({
      name: "strava",
      hostname: "localhost",
      maxAge: 20,
      realtime: true,
      port: 8000
    });

    let store = createStore(
      rootReducer /* preloadedState, */,
      composeEnhancers(
        applyMiddleware(...middleware)
        // other store enhancers if any
      )
    );

    if (isDebuggingInChrome) {
      window.store = store;
    }

    // the current instance become the store we just created (we added run saga fct)
    store = Object.assign(this, store, { run: sagaMiddleware.run });

    // start all sagas
    startingSaga.forEach(saga => store.run(saga));

    deeplink(store);
  }
}
