import { Linking } from 'react-native';
// store
import Store from './store/Store';
import rootReducer from './store/reducers/rootReducer';
import sagaMonitor from './devTools/sagaMonitor';
import startingSaga from './store/sagas/index';
// actions
import { getTemporaryAcessToken } from './store/actions/login';

const store = new Store({ rootReducer, sagaMonitor, startingSaga });

export default store;

// ------------------------------ hacky ----------------------------------------------------
function handleOpenURL(url) {
  if (url != null) {
    // retrieve token from url using a regexp.
    const myRegexp = /(?:&code=)(\w*)/g;
    const match = myRegexp.exec(url);
    store.dispatch(getTemporaryAcessToken(match[1]));
  }
}

Linking.getInitialURL()
  .then(handleOpenURL)
  .catch((err) => {
    // eslint no-console: "error"
    console.error('An error occurred', err);
  });

Linking.addEventListener('url', event => handleOpenURL(event.url));

// ------------------------------ hacky ----------------------------------------------------
