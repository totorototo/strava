import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

import styles from "./styles";

class Link extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(["primary", "secondary", "paper"])
  };

  static defaultProps = {
    mode: "paper"
  };

  render() {
    return <Text {...this.props} style={[styles[`mode${this.props.mode}`]]} />;
  }
}

export default Link;
