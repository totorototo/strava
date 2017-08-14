import { Store } from "reloaddux";
import { composeWithDevTools } from "remote-redux-devtools";

import sagaMonitor from "./devTools/sagaMonitor";
import businessApp from "./store/businesses/index";

import deeplink from "./store/deeplink";

const composeEnhancer = composeWithDevTools({
  name: "strava",
  hostname: "localhost",
  maxAge: 20,
  realtime: false,
  port: 8000
});

const store = new Store({ sagaMonitor, composeEnhancer });
deeplink(store);

store.registerBusiness(businessApp);

export default store;
