import React, { Component } from "react";

import { View, ScrollView, Dimensions, Text, Image } from "react-native";

import MapView from "react-native-maps";
import CountDown from "./components/CountDown";

import styles from "./styles";
import { coordinates, markers } from "./data";

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

const messages = {
  days: {
    plural: "Days",
    singular: "Day"
  },
  hours: "Hours",
  mins: "Min",
  secs: "Sec"
};

class RacePredictor extends Component {
  static finish() {
    console.log("Countdown finished");
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.mapContainer}>
            <Text>Tour des cirques</Text>
            <Image
              style={[styles.image, { width }]}
              source={{
                uri:
                  "http://www.grandraidpyrenees.com/wp-content/uploads/sites/870/2016/10/grp2017_affichefinale_sebcazes.jpg"
              }}
            />
            <CountDown
              date="2017-08-25T08:00:00+00:00"
              {...messages}
              onEnd={this.finish}
            />
          </View>

          <View style={styles.mapContainer}>
            <Text>Map</Text>
            <MapView style={styles.map} initialRegion={SAMPLE_REGION}>
              <MapView.Polyline
                coordinates={coordinates}
                strokeColor="#FC4C02"
                fillColor="#FC4C02"
                strokeWidth={3}
              />
              {markers.map(marker =>
                <MapView.Marker
                  key={marker.title + marker.description}
                  coordinate={marker.coordinates}
                  title={marker.title}
                  description={marker.description}
                  pinColor="#FC4C02"
                />
              )}
            </MapView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default RacePredictor;
