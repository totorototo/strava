import React, { Component } from "react";

import { View } from "react-native";

import CountDown from "./components/CountDown";

import styles from "./styles";

class RacePredictor extends Component {
  static finish() {
    console.log("Countdown finished");
  }

  render() {
    const messages = {
      days: {
        plural: "Days",
        singular: "Day"
      },
      hours: "Hours",
      mins: "Min",
      segs: "Seg"
    };

    return (
      <View style={styles.container}>
        <CountDown
          date="2017-08-25T08:00:00+00:00"
          {...messages}
          onEnd={this.finish}
        />
      </View>
    );
  }
}

export default RacePredictor;
