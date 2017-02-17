// react-native
import React, { Component } from 'react';
import { Linking } from 'react-native';

// redux
import { Provider } from 'react-redux';

// actions
import { getTemporaryAcessToken } from './actions/login';

// Container
import AppWithNavigationState from './containers/AppContainer';

// store
import configureStore from './store/configureStore';

const store = configureStore();

function handleOpenURL(url) {
  if (url != null) {
    const myRegexp = /(?:&code=)(\w*)/g;
    const match = myRegexp.exec(url);
    store.dispatch(getTemporaryAcessToken(match[1]));
  }
}


Linking.addEventListener('url', event => handleOpenURL(event.url));


export default class App extends Component {

  componentDidMount() {
      // eslint-disable no-console
    Linking.getInitialURL()
          .then(handleOpenURL)
          .catch(err => console.error('An error occurred', err));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', handleOpenURL);
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
