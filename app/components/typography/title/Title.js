import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

import styles from "./styles";

class Title extends Component {
  static propTypes = {
    level: PropTypes.oneOf(["huge", 1, 2, 3]),
    mode: PropTypes.oneOf(["primary", "secondary", "paper"]),
    style: PropTypes.shape({})
  };

  static defaultProps = {
    level: 1,
    mode: "paper",
    style: null
  };

  render() {
    return (
      <Text
        {...this.props}
        style={[
          this.props.style,
          styles[`level_${this.props.level}`],
          styles[`mode_${this.props.mode}`]
        ]}
      />
    );
  }
}

export default Title;
