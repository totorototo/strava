import React, { Component } from "react";

import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";

import MyLocationMapMarker from "./components/locationMapMarker/LocationMapMarker";

import { coordinates, markers } from "./data";
import styles from "./styles";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 42.78386;
const LONGITUDE = 0.15844;
const LATITUDE_DELTA = 0.37;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class RacePredictor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      trackPosition: false
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  toggleTracking() {
    this.setState({ trackPosition: !this.state.trackPosition });
  }

  jumpRandom() {
    this.setState({ region: this.randomRegion() });
  }

  animateRandom() {
    this.map.animateToRegion(this.randomRegion());
  }

  animateRandomCoordinate() {
    this.map.animateToCoordinate(this.randomCoordinate());
  }

  randomCoordinate() {
    const region = this.state.region;
    return {
      latitude:
        region.latitude + (Math.random() - 0.5) * (region.latitudeDelta / 2),
      longitude:
        region.longitude + (Math.random() - 0.5) * (region.longitudeDelta / 2)
    };
  }

  randomRegion() {
    return {
      ...this.state.region,
      ...this.randomCoordinate()
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          onRegionChange={region => this.onRegionChange(region)}
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
          initialRegion={this.state.region}
          loadingEnabled
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
          {this.state.trackPosition ? <MyLocationMapMarker /> : null}
        </MapView>

        <View style={[styles.bubble, styles.latlng]}>
          <Text style={styles.detail}>
            {this.state.region.latitude.toPrecision(7)},
            {this.state.region.longitude.toPrecision(7)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.toggleTracking()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>
              {this.state.trackPosition ? "UnTrack" : "Track"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.animateRandom()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>Animate (Region)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.animateRandomCoordinate()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>Animate (Coordinate)</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RacePredictor;
