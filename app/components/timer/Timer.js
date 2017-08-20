import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Text } from "react-native";

import { msToTime } from "../../store/services/helpers/moment";
import styles from "./styles";

class Timer extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    timerStyle: View.propTypes.style
  };

  static defaultProps = {
    timerStyle: null
  };

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

    const time = msToTime(Math.abs(this.state.elapsedTime));

    return (
      <View style={[styles.container, timerStyle]}>
        <Text style={styles.text}>
          {time}
        </Text>
      </View>
    );
  }
}

export default Timer;
