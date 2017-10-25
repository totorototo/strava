import React, { Component } from "react";
import PropTypes from "prop-types";
import { Circle } from "react-native-progress";

import theme from "../../../theme/theme";

export default class Progress extends Component {
  static propTypes = {
    progress: PropTypes.number
  };

  static defaultProps = {
    progress: NaN
  };

  render() {
    return (
      <Circle
        animated
        progress={this.props.progress || 0}
        indeterminate={Number.isNaN(this.props.progress)}
        showsText
        size={200}
        color={theme.BackgroundTextColor}
        borderColor={theme.BackgroundTextColor}
        unifiledColor="#559988"
      />
    );
  }
}
