import React, { Component } from "react";

import { View, Text } from "react-native";

import styles from "./styles";

class RacePredictor extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Circus Tour time prediction</Text>
        <Text>101% accurate</Text>
      </View>
    );
  }
}

export default RacePredictor;
