import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import MapView from "react-native-maps";

import positionHelper from "../../../store/services/helpers/gps";
import styles from "./styles";
import theme from "../../../theme/theme";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.57;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// TODO: helper function to be moved asap!
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

  constructor(props) {
    super(props);
    this.state = {
      SAMPLE_REGION: {
        latitude: this.props.race.path.coordinates[0].latitude || 47.478419,
        longitude:
          this.props.race.path.coordinates[0].longitude || -0.5631660000000238,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const { race } = this.props;
    if (nextProps.race && nextProps.race.path !== race.path) {
      this.setState({
        SAMPLE_REGION: {
          latitude: race.path.coordinates[0].latitude,
          longitude: race.path.coordinates[0].longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    }
  }

  render() {
    const { race, clubMembers } = this.props;

    return (
      <MapView style={styles.map} initialRegion={this.state.SAMPLE_REGION}>
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
                (location.coords && location.coords.longitude) ||
                race.path.coordinates[0].longitude,
              latitude:
                (location.coords && location.coords.latitude) ||
                race.path.coordinates[0].latitude
            };

            const nearestPoint = positionHelper.findClosestPoint(
              race.path.coordinates,
              coordinate
            );

            const trailRunner = clubMembers.find(
              athlete => athlete.id === parseInt(id, 10)
            );

            let description = "";
            const index = race.path.coordinates.findIndex(
              point =>
                point.longitude === nearestPoint.longitude &&
                point.latitude === nearestPoint.latitude
            );
            if (index) {
              const pathDone = race.path.coordinates.slice(0, index);
              description = `distance done: ${positionHelper.computePathDistance(
                pathDone
              )}`;
            }

            return (
              <MapView.Marker
                coordinate={nearestPoint}
                title={trailRunner ? trailRunner.firstname : id}
                description={description}
                pinColor={getColor(id)}
                key={id}
              />
            );
          })}
      </MapView>
    );
  }
}
