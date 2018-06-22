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
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            src: PropTypes.shape({
              longitude: PropTypes.number,
              latitude: PropTypes.number,
              altitude: PropTypes.number
            }),
            dest: PropTypes.shape({
              longitude: PropTypes.number,
              latitude: PropTypes.number,
              altitude: PropTypes.number
            }),
            length: PropTypes.number
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

    const region = positionHelper.computeRegion(...race.path.edges);

    const sampleRegion = {
      latitude: (region.maxLatitude + region.minLatitude) / 2,
      longitude: (region.maxLongitude + region.minLongitude) / 2,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    const raceData = race.path.edges.reduce(
      (locations, edge) => [
        ...locations,
        { longitude: edge.src.longitude, latitude: edge.src.latitude }
      ],
      []
    );

    return (
      <MapView style={styles.map} initialRegion={sampleRegion}>
        <MapView.Polyline
          coordinates={raceData}
          strokeColor={theme.PrimaryColor}
          fillColor={theme.PrimaryColor}
          strokeWidth={3}
        />
        {race.checkPoints &&
          race.checkPoints.map(marker => (
            <MapView.Marker
              key={marker.title + marker.description}
              coordinate={marker.coordinates}
              title={marker.title}
              description={marker.description}
              pinColor={theme.PrimaryColor}
            />
          ))}
        {race.positions &&
          Object.entries(race.positions).map(([id, location]) => {
            const coordinate = {
              longitude:
                (location.coords && location.coords.longitude) ||
                race.path.coordinates[0].longitude,
              latitude:
                (location.coords && location.coords.latitude) ||
                race.path.coordinates[0].latitude
            };

            const nearestEdge = positionHelper.findClosestEdge(
              coordinate,
              ...race.path.edges
            );

            const trailRunner = clubMembers.find(
              athlete => athlete.id === parseInt(id, 10)
            );

            return (
              <MapView.Marker
                coordinate={nearestEdge.src}
                title={trailRunner ? trailRunner.firstname : id}
                description="bla"
                pinColor={getColor(id)}
                key={id}
              />
            );
          })}
      </MapView>
    );
  }
}
