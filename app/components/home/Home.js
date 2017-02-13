// react
import React, { Component } from 'react';

// react-native
import { View, Text } from 'react-native';

// rnrf
import { Actions } from 'react-native-router-flux';


// styles
const styles = require('./Styles');

export default class Home extends Component {

  render() {
    return (
      <View style={styles.home}>
        <Text onPress={Actions.login}>This is home!</Text>
      </View>
    );
  }
}
