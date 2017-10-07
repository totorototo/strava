import React, { Component } from "react";
import { View, WebView } from "react-native";
import Config from "react-native-config";

import styles from "./styles";

const { CLIENT_ID, URL_SHEME_PREFIX, URL_SHEME_HOST } = Config;
const CALL_BACK_URL_SHEME = `${URL_SHEME_PREFIX}://${URL_SHEME_HOST}/main`;
const INITIAL_URI = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${CALL_BACK_URL_SHEME}&scope=public`;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  onShouldStartLoadWithRequest = url => {
    if (this.webView !== null) {
      if (!url.startsWith(CALL_BACK_URL_SHEME)) {
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
