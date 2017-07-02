import Store from "./store/Store";
import rootReducer from "./store/state/rootReducer";
import sagaMonitor from "./devTools/sagaMonitor";
import startingSaga from "./store/sagas/appSagas/index";

const store = new Store({ rootReducer, sagaMonitor, startingSaga });

export default store;
