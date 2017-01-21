'use strict';
import React, {Component, PropTypes} from 'react';

import {View, Text} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Login extends Component {

    render() {

        const{login} = this.props;

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