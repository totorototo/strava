import React, { Component } from "react";

import { View, ScrollView, Dimensions, Text } from "react-native";
import { Card } from "react-native-elements";

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
      secs: "Sec"
    };

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Card
            dividerStyle={styles.dividerStyle}
            containerStyle={styles.clubImageStyle}
            titleStyle={styles.card}
            title="Count Down"
            image={{
              uri:
                "http://www.team-outdoor.fr/blog/wp-content/uploads/2014/09/paysage.jpg"
            }}
          >
            <CountDown
              date="2017-08-25T08:00:00+00:00"
              {...messages}
              onEnd={this.finish}
            />
          </Card>
          <Card
            dividerStyle={styles.dividerStyle}
            containerStyle={styles.containerCardStyle}
            titleStyle={styles.card}
            title="Race"
          >
            <View>
              <MapView
                liteMode
                style={styles.map}
                initialRegion={SAMPLE_REGION}
              >
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
              <Text style={styles.text}>
                GRAND RAID DES PYRENEES: Tour des Cirques 2017
              </Text>
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

export default RacePredictor;
