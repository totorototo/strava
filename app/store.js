import Store from "./store/Store";
import rootReducer from "./store/reducers/rootReducer";
import sagaMonitor from "./devTools/sagaMonitor";
import startingSaga from "./store/sagas/index";
import { subcribe } from "./deeplink";

const store = new Store({ rootReducer, sagaMonitor, startingSaga });
subcribe(store);

export default store;
