import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import { msToTime } from "../../../store/services/helpers/moment";
import styles from "./styles";
import clock from "../../../hocs/clock";
import Title from "../../typography/title/Title";

class Countdown extends Component {
  static propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
      .isRequired,
    now: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
      .isRequired,
    timerStyle: View.propTypes.style
  };

  static defaultProps = {
    timerStyle: null
  };

  render() {
    const { timerStyle } = this.props;
    const time = msToTime(
      Math.abs(new Date(this.props.date) - new Date(this.props.now))
    );

    return (
      <View style={[styles.container, timerStyle]}>
        <Title level="huge">
          {time}
        </Title>
      </View>
    );
  }
}

export default clock(Countdown);
