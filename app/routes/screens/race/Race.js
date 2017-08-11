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

import Timer from "../../components/timer/Timer";
import styles from "./styles";

import { isFaulty, getDefect, Loading } from "../../../dataDefinitions/defects";

import selector from "./selector";
import actionsCreator from "./actionsCreator";

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

const EXPANDED_MENU_HEIGHT = 250;
const COLLAPSED_MENU_HEIGHT = 25;

const { UIManager } = NativeModules;

// Enable LayoutAnimation under Android
// eslint-disable-next-line
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

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
    }).isRequired,
    geoloactionActionsCreators: PropTypes.objectOf(PropTypes.func).isRequired
  };

  static intToColor(id = 0) {
    // eslint-disable-next-line
    const c = (id & 0x00ffffff).toString(16).toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
  }

  state = {
    expand: false
  };

  toggleMenu = () => {
    // Animate the update
    LayoutAnimation.spring();
    this.setState({ expand: !this.state.expand });
  };

  render() {
    const { race, geoloactionActionsCreators } = this.props;
    const animatedStyle = { opacity: this.state.expand ? 1 : 0 };

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
            Object.entries(race.locations).map(([id, location]) => {
              const coordinate = {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude
              };

              return (
                <MapView.Marker
                  coordinate={coordinate}
                  title={id}
                  description={new Date(location.timestamp).toLocaleString()}
                  pinColor={`#${RacePredictor.intToColor(id)}`}
                  key={id}
                />
              );
            })}
        </MapView>
        <View
          style={[
            styles.overlay,
            {
              height: this.state.expand
                ? EXPANDED_MENU_HEIGHT
                : COLLAPSED_MENU_HEIGHT
            }
          ]}
        >
          <Timer raceDate={race.startingTime} timerStyle={animatedStyle} />
          <TouchableOpacity>
            <Icon
              name={this.state.expand ? "expand-less" : "expand-more"}
              color="#FC4C02"
              size={30}
              onPress={this.toggleMenu}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.bubble, styles.button]}
            onPress={() => geoloactionActionsCreators.shareLocation()}
          >
            <Text style={styles.buttonText}>Spot me!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(selector, actionsCreator)(RacePredictor);
