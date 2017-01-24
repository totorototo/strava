'use strict';
import React, {Component, PropTypes} from 'react';

import {View, Text, Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {

    componentDidMount() {

        let stravaUrl = 'https://www.strava.com/oauth/authorize?client_id=15688&state=mystate&response_type=code&redirect_uri=strava://localhost&scope=public&approval_prompt=auto';

        Linking.addEventListener('url', this.handleOpenURL);

        Linking.canOpenURL(stravaUrl).then(supported => {
            if (supported) {
                Linking.openURL(stravaUrl);
            } else {
                console.log('Don\'t know how to open URI: ' + this.props.url);
            }
        });
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL(event) {
        console.log(event.url);
    }

    render() {

        const {login} = this.props;

        return (
            <View style={{margin: 128}}>
                <Text onPress={login}>This is login!</Text>
            </View>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
};