// react-native
import 'react-devtools'; // Put it first!
import React, { Component } from 'react';
// redux
import { Provider } from 'react-redux';
// Container
import Login from './routes/screens/login/Login';

//import AppWithNavigationState from './routes/AppWithNavigationState';
// Store
import store from './store';
import app from './businesses/app';
import withBusiness from './store/helpers/withBusiness';

const AppWithBusiness = withBusiness(app)(Login);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithBusiness />
      </Provider>
    );
  }
}
