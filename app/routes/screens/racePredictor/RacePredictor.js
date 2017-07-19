import React, { Component } from "react";

import { View } from "react-native";
import MapView from "react-native-maps";

import styles from "./styles";

class RacePredictor extends Component {
  static finish() {
    console.log("Countdown finished");
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    );
  }
}

export default RacePredictor;
