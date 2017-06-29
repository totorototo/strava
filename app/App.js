import "react-devtools"; // Put it first!
import React, { Component } from "react";

import { Provider } from "react-redux";

import AppWithNavigationState from "./routes/AppWithNavigationState";

import store from "./store";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
