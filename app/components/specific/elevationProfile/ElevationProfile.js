import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ART } from "react-native";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as d3Array from "d3-array";

import styles from "./styles";

const { Surface, Group, Shape } = ART;
const d3 = {
  scale,
  shape,
  d3Array
};

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

  static createScaleX(start, end, width) {
    return d3.scale
      .scaleLinear()
      .domain([start, end])
      .nice()
      .range([0, width]);
  }

  static createScaleY(minY, maxY, height) {
    return (
      d3.scale
        .scaleLinear()
        .domain([minY, maxY])
        .nice()
        // We invert our range so it outputs using the axis that React uses.
        .range([height, 0])
    );
  }

  static createLineGrpah(data, width, height) {
    // Create our x-scale.
    const scaleX = ElevationProfile.createScaleX(0, data.length - 1, width);

    // Collect all y values.
    const altitudes = data.reduce(
      (accu, location) => [...accu, location.altitude],
      []
    );

    // Get the min and max y value.
    const extentY = d3Array.extent(altitudes);

    // Create our y-scale.
    const scaleY = ElevationProfile.createScaleY(0, extentY[1], height);

    // Use the d3-shape line generator to create the `d={}` attribute value.
    const lineShape = d3.shape
      .line()
      // For every x and y-point in our line shape we are given an item from our
      // array which we pass through our scale function so we map the domain value
      // to the range value.
      .x(d => scaleX(data.indexOf(d)))
      .y(d => scaleY(d.altitude));

    return {
      // Pass in our array of data to our line generator to produce the `d={}`
      // attribute value that will go into our `<Shape />` component.
      path: lineShape(data)
    };
  }

  render() {
    const { coordinates } = this.props;

    const lineGraph = ElevationProfile.createLineGrpah(coordinates, 400, 300);

    return (
      <View style={styles.container}>
        <Surface width={500} height={500}>
          <Group x={100} y={0}>
            <Shape d={lineGraph.path} stroke="#000" strokeWidth={1} />
          </Group>
        </Surface>
      </View>
    );
  }
}
