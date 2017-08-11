import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Text } from "react-native";

import styles from "./styles";

class Timer extends Component {
  static propTypes = {
    startingDate: PropTypes.string.isRequired
  };

  static msToTime(duration) {
    let seconds = parseInt(duration / 1000 % 60, 10);
    let minutes = parseInt(duration / (1000 * 60) % 60, 10);
    let hours = parseInt(duration / (1000 * 60 * 60) % 24, 10);

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
  }

  constructor(props) {
    super(props);
    this.state = {
      startingTime: new Date(this.props.startingDate),
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
    const timestamp = new Date() - this.state.startingTime;
    const formattedTime = Timer.msToTime(timestamp);

    this.setState({
      elapsedTime: formattedTime
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.state.elapsedTime}
        </Text>
      </View>
    );
  }
}

export default Timer;
