import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  NativeModules,
  LayoutAnimation
} from "react-native";
import { Icon } from "react-native-elements";
import MapView from "react-native-maps";
import { connect } from "react-redux";

import CountDown from "../../../../components/countdown/Countdown";
import styles from "./styles";
import {
  isFaulty,
  getDefect,
  IsLoading
} from "../../../../dataDefinitions/defects";
import selector from "./selector";
import mapDispatchToProps from "./mapDispatchToProps";
import Loading from "../../../../components/loading/Loading";
import Faulty from "../../../../components/faulty/Faulty";
import theme from "../../../../theme/theme";

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

const EXPANDED_MENU_HEIGHT = 150;
const COLLAPSED_MENU_HEIGHT = 35;

const { UIManager } = NativeModules;

// Enable LayoutAnimation under Android
// eslint-disable-next-line
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class RacePredictor extends Component {
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
    ).isRequired,
    shareLocation: PropTypes.func.isRequired
  };

  static intToColor(id = 0) {
    // eslint-disable-next-line
    const c = (id & 0x00ffffff).toString(16).toUpperCase();
    return `#${"00000".substring(0, 6 - c.length)}${c}`;
  }

  state = {
    expanded: false
  };

  getAthlete = (athletes = [], id) => {
    athletes.find(athlete => athlete.id === id);
  };

  toggleMenu = () => {
    // Animate the update
    LayoutAnimation.spring();
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { race, clubMembers, shareLocation } = this.props;
    const animatedStyle = { opacity: this.state.expanded ? 1 : 0 };

    if (race === IsLoading) return <Loading />;

    if (isFaulty(race)) return <Faulty message={getDefect(race)} />;

    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={SAMPLE_REGION}>
          <MapView.Polyline
            coordinates={race.path.coordinates}
            strokeColor={theme.PrimaryColor}
            fillColor={theme.PrimaryColor}
            strokeWidth={3}
          />
          {race.checkPoints.map(marker =>
            <MapView.Marker
              key={marker.title + marker.description}
              coordinate={marker.coordinates}
              title={marker.title}
              description={marker.description}
              pinColor={theme.PrimaryColor}
            />
          )}
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
                  pinColor={RacePredictor.intToColor(id)}
                  key={id}
                />
              );
            })}
        </MapView>
        <View
          style={[
            styles.overlay,
            {
              height: this.state.expanded
                ? EXPANDED_MENU_HEIGHT
                : COLLAPSED_MENU_HEIGHT
            }
          ]}
        >
          <CountDown date={race.date} timerStyle={animatedStyle} />
          <TouchableOpacity>
            <Icon
              name={this.state.expanded ? "expand-less" : "expand-more"}
              color={theme.paperColorText}
              size={30}
              onPress={this.toggleMenu}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.bubble, styles.button]}
            onPress={shareLocation}
          >
            <Text style={styles.buttonText}>Spot me!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(selector, mapDispatchToProps)(RacePredictor);
