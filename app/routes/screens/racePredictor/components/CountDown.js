import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

import styles from "./styles";

class CountDown extends Component {
  static propTypes = {
    date: PropTypes.string,
    onEnd: PropTypes.func
  };
  static defaultProps = {
    date: new Date(),
    days: {
      plural: "Days",
      singular: "Day"
    },
    hours: "Hours",
    minutes: "Mins",
    seconds: "Secs",
    onEnd: () => {}
  };

  static getDateData(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    if (diff <= 0) {
      return false;
    }

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0
    };

    if (diff >= 365.25 * 86400) {
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;
    return timeLeft;
  }

  static leadingZeros(num, length = null) {
    let currLength = length;
    let currNum = num;
    if (currLength === null) {
      currLength = 2;
    }
    currNum = String(currNum);
    while (currNum.length < currLength) {
      currNum = `0${currNum}`;
    }
    return currNum;
  }

  state = {
    days: 0,
    hours: 0,
    min: 0,
    sec: 0
  };

  componentWillMount() {
    const date = CountDown.getDateData(this.props.date);
    if (date) {
      this.setState(date);
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const date = CountDown.getDateData(this.props.date);
      if (date) {
        this.setState(date);
      } else {
        this.stop();
        this.props.onEnd();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  stop() {
    clearInterval(this.interval);
  }

  render() {
    const countDown = this.state;

    return (
      <View style={styles.container}>
        <Text>{`${CountDown.leadingZeros(
          countDown.days
        )}: ${CountDown.leadingZeros(
          countDown.hours
        )}: ${CountDown.leadingZeros(countDown.min)}: ${CountDown.leadingZeros(
          countDown.sec
        )}`}</Text>
      </View>
    );
  }
}

export default CountDown;
