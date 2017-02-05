// react
import React, { Component, PropTypes } from 'react';
// react-native
import { View, Text, Linking, WebView } from 'react-native';

// rnrf
// import { Actions } from 'react-native-router-flux';

const WEBVIEW_REF = 'webview';
const INITIAL_URI = 'https://www.strava.com/oauth/authorize?client_id=15688&response_type=code&redirect_uri=strava://localhost&scope=public';

export default class Login extends Component {

  onShouldStartLoadWithRequest = event =>
    // if(this.refs != null){
    //     if(!event.url.startsWith('strava://localhost')){
    //         return true;
    //     }else{
    //         this._webView.stopLoading();
    // Some reference to your WebView to make it stop loading that URL
    //         return false;
    //     }
    // }
    true;

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

Login.propTypes = {
  login: PropTypes.func.isRequired,
};
