import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

import styles from "./styles";

class Paragraph extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(["primary", "secondary", "paper"]),
    style: PropTypes.shape({})
  };

  static defaultProps = {
    mode: "primary",
    style: null
  };

  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, styles[`mode_${this.props.mode}`]]}
      />
    );
  }
}

export default Paragraph;
