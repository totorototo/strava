import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Dimensions, Text } from "react-native";
import { Icon } from "react-native-elements";

import MapView from "react-native-maps";
import { connect } from "react-redux";

import styles from "./styles";

import { isFaulty, getDefect, Loading } from "../../../dataDefinitions/defects";

import selector from "./selector";

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
  static propTypes = {
    race: PropTypes.shape({
      startingTime: PropTypes.string,
      path: PropTypes.shape({
        coordinates: PropTypes.arrayOf(
          PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number
          })
        )
      }),
      runners: PropTypes.string,
      checkPoints: PropTypes.arrayOf(
        PropTypes.shape({
          identifier: PropTypes.string,
          title: PropTypes.string,
          description: PropTypes.string,
          coordinates: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number
          })
        })
      )
    }).isRequired
  };

  static finish() {
    console.log("Countdown finished");
  }

  render() {
    const { race } = this.props;

    if (race === Loading)
      return (
        <View style={styles.container}>
          <Icon name="cached" color="#FC4C02" size={50} />
          <Text style={styles.text}>fetching data</Text>
        </View>
      );

    if (isFaulty(race))
      return (
        <View style={styles.container}>
          <Icon name="error" color="#FC4C02" size={100} />
          <Text style={styles.text}>
            Oops, I did it again: {getDefect(race)}
          </Text>
        </View>
      );

    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={SAMPLE_REGION}>
          <MapView.Polyline
            coordinates={race.path.coordinates}
            strokeColor="#FC4C02"
            fillColor="#FC4C02"
            strokeWidth={3}
          />
          {race.checkPoints.map(marker =>
            <MapView.Marker
              key={marker.title + marker.description}
              coordinate={marker.coordinates}
              title={marker.title}
              description={marker.description}
              pinColor="#FC4C02"
            />
          )}
          {race.locations &&
            Object.entries(race.locations).map(([id, location]) =>
              <MapView.Marker
                coordinate={location.coordinates}
                title={id}
                description={location.time}
                pinColor="#004C02"
                key={id}
              />
            )}
        </MapView>
      </View>
    );
  }
}

export default connect(selector)(RacePredictor);
