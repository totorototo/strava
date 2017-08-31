import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";
import { View, Text } from "react-native";

import styles from "./styles";
import theme from "./../../theme/theme";

export default class Faulty extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <Icon name="error" color={theme.PrimaryColor} size={100} />
        <Text style={styles.text}>
          Oops, I did it again: {this.props.message}
        </Text>
      </View>
    );
  }
}
