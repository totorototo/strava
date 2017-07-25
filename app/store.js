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
    authenticationFlow: authenticationFlowSaga(),
    athletactivitiesSagae: activitiesSaga(),
    clubsSaga: clubsSaga()
  }
});

store.dispatch({
  type: "SET_ACCESS_TOKEN",
  accessToken: "898741e906a19063f8e002336dbe9f3c04eb546b"
});

console.log(store.getState());

export default store;
