// react
import React, { Component } from "react";

// react-native
import { View, WebView } from "react-native";

import styles from "./styles";

const INITIAL_URI = "https://www.strava.com/oauth/authorize?client_id=15688&response_type=code&redirect_uri=strava://localhost&scope=public";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  onShouldStartLoadWithRequest = url => {
    if (this.webView != null) {
      if (!url.startsWith("strava://localhost")) {
        this.setState(() => ({ visible: true }));
      } else {
        this.setState(() => ({ visible: false }));
      }
    }
    return true;
  };

  render() {
    const currentStyles = [styles.login];
    if (!this.state.visible) {
      currentStyles.push(styles.hide);
    }

    return (
      <View style={currentStyles}>
        <WebView
          ref={ref => {
            this.webView = ref;
          }}
          source={{ uri: INITIAL_URI }}
          onNavigationStateChange={event =>
            this.onShouldStartLoadWithRequest(event.url)}
          onShouldStartLoadWithRequest={event =>
            this.onShouldStartLoadWithRequest(event.url)}
        />
      </View>
    );
  }
}
