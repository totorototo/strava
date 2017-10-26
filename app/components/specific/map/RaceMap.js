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

const getColor = (id = 0) => {
  // eslint-disable-next-line
  const c = (id & 0x00ffffff).toString(16).toUpperCase();
  return `#${"00000".substring(0, 6 - c.length)}${c}`;
};

export default class RaceMap extends Component {
  static propTypes = {
    race: PropTypes.shape({
      date: PropTypes.string,
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
    }).isRequired,
    clubMembers: PropTypes.arrayOf(
      PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        profile: PropTypes.string,
        country: PropTypes.string
      })
    ).isRequired
  };

  static defaultProps = {};

  render() {
    const { race, clubMembers } = this.props;

    return (
      <MapView style={styles.map} initialRegion={SAMPLE_REGION}>
        <MapView.Polyline
          coordinates={race.path.coordinates}
          strokeColor={theme.PrimaryColor}
          fillColor={theme.PrimaryColor}
          strokeWidth={3}
        />
        {race.checkPoints.map(marker => (
          <MapView.Marker
            key={marker.title + marker.description}
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.description}
            pinColor={theme.PrimaryColor}
          />
        ))}
        {race.locations &&
          Object.entries(race.locations).map(([id, location]) => {
            const coordinate = {
              longitude:
                (location.coords && location.coords.longitude) || 0.15844,
              latitude:
                (location.coords && location.coords.latitude) || 42.78386
            };

            const trailRunner = clubMembers.find(
              athlete => athlete.id === parseInt(id, 10)
            );

            return (
              <MapView.Marker
                coordinate={coordinate}
                title={trailRunner ? trailRunner.firstname : id}
                description={new Date(location.timestamp).toLocaleString()}
                pinColor={getColor(id)}
                key={id}
              />
            );
          })}
      </MapView>
    );
  }
}
