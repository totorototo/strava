import { Store } from "reloaddux";
import sagaMonitor from "./devTools/sagaMonitor";
import { authenticationFlowSaga } from "./store/sagas/appSagas/login";
import { activitiesSaga } from "./store/sagas/activities";
import { clubsSaga } from "./store/sagas/clubs";

import rootReducer from "./store/state/rootReducer";
import deeplink from "./store/deeplink";

const store = new Store({
  preloadedState: undefined,
  sagaMonitor
});

deeplink(store);

store.registerBusiness({
  reducersTree: {
    reducer: rootReducer,
    default: rootReducer({}, { type: "@@redux/INIT" })
  },
  sagasMap: {
    authenticationFlowSaga,
    activitiesSaga,
    clubsSaga
  }
});

export default store;
