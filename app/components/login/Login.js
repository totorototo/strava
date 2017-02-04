'use strict';
import React, {Component, PropTypes} from 'react';

import {View, Text, Linking, WebView} from 'react-native';
import {Actions} from 'react-native-router-flux';

let WEBVIEW_REF = 'webview';
let INITIAL_URI = 'https://www.strava.com/oauth/authorize?client_id=15688&response_type=code&redirect_uri=strava://localhost&scope=public';

export default class Login extends Component {

    onShouldStartLoadWithRequest = (event) => {
        // if(this.refs != null){
        //     if(!event.url.startsWith('strava://localhost')){
        //         return true;
        //     }else{
        //         this.refs[WEBVIEW_REF].stopLoading();            //Some reference to your WebView to make it stop loading that URL
        //         return false;
        //     }
        // }
        return true;
    };

    render() {

       return (
            <WebView
                ref={WEBVIEW_REF}
                source={{uri: INITIAL_URI}}
                style={{marginTop: 20}}
                onNavigationStateChange={this.onShouldStartLoadWithRequest}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}

            />
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
};