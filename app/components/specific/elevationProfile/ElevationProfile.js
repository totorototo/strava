import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ART } from "react-native";

import styles from "./styles";

const { Surface, Group, Shape } = ART;

export default class ElevationProfile extends Component {
  static propTypes = {
    coordinates: PropTypes.arrayOf(
      PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        altitude: PropTypes.number
      })
    ).isRequired
  };

  render() {
    const { coordinates } = this.props;
    console.log(coordinates);

    return (
      <View style={styles.container}>
        <Surface width={500} height={500}>
          <Group x={100} y={0}>
            <Shape
              d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
              stroke="#000"
              strokeWidth={1}
            />
          </Group>
        </Surface>
      </View>
    );
  }
}
