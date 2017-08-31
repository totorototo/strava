import React, { Component } from "react";
import { Icon } from "react-native-elements";
import { View, Text } from "react-native";

import styles from "./styles";
import theme from "../../theme/theme";

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="cached" color={theme.PrimaryColor} size={50} />
        <Text style={styles.text}>fetching data</Text>
      </View>
    );
  }
}
