// react-native
import React, { Component } from 'react';

// redux
import { Provider } from 'react-redux';

// Container
import AppWithNavigationState from './containers/AppContainer';

// store
import configureStore from './store/configureStore';

const store = configureStore();

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
