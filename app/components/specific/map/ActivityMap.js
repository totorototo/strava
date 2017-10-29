import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import MapView from "react-native-maps";

import styles from "./styles";
import theme from "../../../theme/theme";

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

export default class ActivityMap extends Component {
  static propTypes = {
    coordinates: PropTypes.arrayOf(
      PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number
      })
    ),
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
  };

  static defaultProps = {
    coordinates: [],
    checkPoints: []
  };

  render() {
    const { coordinates, checkPoints } = this.props;

    return (
      <MapView style={styles.map} initialRegion={SAMPLE_REGION}>
        <MapView.Polyline
          coordinates={coordinates}
          strokeColor={theme.PrimaryColor}
          fillColor={theme.PrimaryColor}
          strokeWidth={3}
        />
        {checkPoints.map(marker => (
          <MapView.Marker
            key={marker.title + marker.description}
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.description}
            pinColor={theme.PrimaryColor}
          />
        ))}
      </MapView>
    );
  }
}
