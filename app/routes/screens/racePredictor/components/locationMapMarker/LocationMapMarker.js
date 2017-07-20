import React, { PropTypes } from "react";
import { Text, View, PermissionsAndroid, Platform } from "react-native";
import MapView from "react-native-maps";
import isEqual from "lodash/isEqual";

import styles from "./styles";

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000
};
const ANCHOR = { x: 0.5, y: 0.5 };

const propTypes = {
  ...MapView.Marker.propTypes,
  // override this prop to make it optional
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }),
  children: PropTypes.node,
  geolocationOptions: PropTypes.shape({
    enableHighAccuracy: PropTypes.bool,
    timeout: PropTypes.number,
    maximumAge: PropTypes.number
  }),
  heading: PropTypes.number,
  enableHack: PropTypes.bool
};

const defaultProps = {
  enableHack: false,
  geolocationOptions: GEOLOCATION_OPTIONS,
  heading: 0,
  children: null,
  coordinate: null
};

export default class MyLocationMapMarker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      myPosition: null
    };
  }
  componentDidMount() {
    this.mounted = true;
    // If you supply a coordinate prop, we won't try to track location automatically
    if (this.props.coordinate) return;

    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(granted => {
        if (granted && this.mounted) this.watchLocation();
      });
    } else {
      console.log("watch");
      this.watchLocation();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    // eslint-disable-next-line no-undef
    if (this.watchID) navigator.geolocation.clearWatch(this.watchID);
  }

  watchLocation() {
    // eslint-disable-next-line no-undef
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const myLastPosition = this.state.myPosition;
        const myPosition = position.coords;
        console.log(myLastPosition);
        if (!isEqual(myPosition, myLastPosition)) {
          this.setState({ myPosition });
        }
      },
      null,
      this.props.geolocationOptions
    );
  }

  render() {
    let { heading, coordinate } = this.props;
    if (!coordinate) {
      const { myPosition } = this.state;
      if (!myPosition) return null;
      coordinate = myPosition;
      heading = myPosition.heading;
    }

    const rotate =
      typeof heading === "number" && heading >= 0 ? `${heading}deg` : null;

    return (
      <MapView.Marker
        anchor={ANCHOR}
        style={styles.mapMarker}
        {...this.props}
        coordinate={coordinate}
      >
        <View style={styles.container}>
          <View style={styles.markerHalo} />
          {rotate &&
            <View style={[styles.heading, { transform: [{ rotate }] }]}>
              <View style={styles.headingPointer} />
            </View>}
          <View style={styles.marker}>
            <Text style={styles.text}>
              {this.props.enableHack && rotate}
            </Text>
          </View>
        </View>
        {this.props.children}
      </MapView.Marker>
    );
  }
}

MyLocationMapMarker.propTypes = propTypes;
MyLocationMapMarker.defaultProps = defaultProps;
