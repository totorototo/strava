// store
import Store from './store/Store';
import rootReducer from './store/reducers/rootReducer';
import sagaMonitor from './devTools/sagaMonitor';
import { subcribe } from './deeplink';

const store = new Store({ rootReducer, sagaMonitor });
subcribe(store);

export default store;

