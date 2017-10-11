import React, { Component } from "react";
import { Icon } from "react-native-elements";
import { View } from "react-native";

import styles from "./styles";
import theme from "../../../theme/theme";
import Title from "../../typography/title/Title";

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="cached" color={theme.PrimaryColor} size={50} />
        <Title mode="primary">fetching data</Title>
      </View>
    );
  }
}
