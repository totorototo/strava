// react
import React, { Component } from 'react';
// react-native
import { WebView } from 'react-native';

// rnrf
// import { Actions } from 'react-native-router-flux';

const INITIAL_URI = 'https://www.strava.com/oauth/authorize?client_id=15688&response_type=code&redirect_uri=strava://localhost&scope=public';

export default class Login extends Component {

  onShouldStartLoadWithRequest = (event) => {
    // if (this.refs != null) {
    //   if (!event.url.startsWith('strava://localhost')) {
    //     return true;
    //   }
    //   this._webView.stopLoading();
    //   return false;
    // }
    return true;
  };

  render() {
    return (
      <WebView
        ref={(ref) => {
          this._webView = ref;
        }}
        source={{ uri: INITIAL_URI }}
        style={{ marginTop: 20 }}
        onNavigationStateChange={this.onShouldStartLoadWithRequest}
        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
      />
    );
  }
}

