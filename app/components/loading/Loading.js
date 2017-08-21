import React, { Component } from "react";
import { Icon } from "react-native-elements";
import { View, Text } from "react-native";

import styles from "./styles";

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="cached" color="#FC4C02" size={50} />
        <Text style={styles.text}>fetching data</Text>
      </View>
    );
  }
}
