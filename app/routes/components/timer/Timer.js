import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Text } from "react-native";

import styles from "./styles";

class Timer extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    timerStyle: View.propTypes.style.isRequired
  };

  static msToTime(duration) {
    let seconds = parseInt(duration / 1000 % 60, 10);
    let minutes = parseInt(duration / (1000 * 60) % 60, 10);
    let hours = parseInt(duration / (1000 * 60 * 60) % 24, 10);
    let days = parseInt(duration / (1000 * 60 * 60 * 24) % 365, 10);

    days = days < 10 ? `0${days}` : days;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${days}:${hours}:${minutes}:${seconds}`;
  }

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(this.props.date),
      elapsedTime: 0
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      elapsedTime: new Date() - this.state.date
    });
  }

  render() {
    const { timerStyle } = this.props;

    const time = Timer.msToTime(Math.abs(this.state.elapsedTime));

    return (
      <View style={[styles.container, timerStyle && timerStyle]}>
        <Text style={styles.text}>
          {time}
        </Text>
      </View>
    );
  }
}

export default Timer;
