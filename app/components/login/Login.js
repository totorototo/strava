'use strict';
import React, {Component, PropTypes} from 'react';

import {View, Text, Linking, WebView} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {

    handleNavigationChange(event){
        if(this.refs != null){
            if (event.url.indexOf('strava://localhost') === -1) {
                return true;
            }else{
                this.refs['toto'].stopLoading(); //Some reference to your WebView to make it stop loading that URL
                return false;
            }
        }
        return true;
    }

    render() {

        const {login} = this.props;

        const stravaUrl = 'https://www.strava.com/oauth/authorize?client_id=15688&response_type=code&redirect_uri=strava://localhost&scope=public';

        return (
            <WebView
                source={{uri: stravaUrl}}
                style={{marginTop: 20}}
            />
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
};