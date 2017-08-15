import { Store } from "reloaddux";
import { composeWithDevTools } from "remote-redux-devtools";

import sagaMonitor from "./devTools/sagaMonitor";
import businessApp from "./store/businesses/index";

const composeEnhancer = composeWithDevTools({
  name: "strava",
  hostname: "localhost",
  maxAge: 20,
  realtime: true,
  port: 8000
});

const store = new Store({ sagaMonitor, composeEnhancer });
store.registerBusiness(businessApp);

export default store;
