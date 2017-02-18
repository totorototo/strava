// react-native
import React, { Component } from 'react';
// redux
import { Provider } from 'react-redux';
// Container
import AppWithNavigationState from './routes/AppWithNavigationState';
// Store
import store from './store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
