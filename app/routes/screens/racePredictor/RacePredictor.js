import React, { Component } from "react";

import { View, Dimensions, Text } from "react-native";
import MapView from "react-native-maps";

import { coordinates } from "./data";
import styles from "./styles";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 42.78386;
const LONGITUDE = 0.15844;
const LATITUDE_DELTA = 0.37;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SAMPLE_REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};

class RacePredictor extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={SAMPLE_REGION}>
          <MapView.Polyline
            coordinates={coordinates}
            strokeColor="#FC4C02"
            fillColor="#FC4C02"
            strokeWidth={3}
          />
        </MapView>

        <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            <Text>Custom Tiles</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default RacePredictor;
