// react
import React, { Component } from 'react';

// react-native
import { View, Text } from 'react-native';

// styles
const styles = require('./Styles');

export default class Home extends Component {

  render() {
    return (
      <View style={styles.home}>
        <Text>This is home!</Text>
      </View>
    );
  }
}
