'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Home extends Component {

    render() {
        return (
            <View style={{margin: 128}}>
                <Text onPress={Actions.login}>This is home!</Text>
            </View>
        );
    }
}