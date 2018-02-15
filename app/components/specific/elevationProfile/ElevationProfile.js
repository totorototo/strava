import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ART, Dimensions } from "react-native";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as d3Array from "d3-array";

import positionHelper from "../../../store/services/helpers/gps";
import styles from "./styles";

const { Surface, Shape } = ART;
const d3 = {
  scale,
  shape,
  d3Array
};

export default class ElevationProfile extends Component {
  static propTypes = {
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
    }).isRequired
  };

  static createXScale(start, end, rangeWidth) {
    return d3.scale
      .scaleLinear()
      .domain([start, end])
      .range([0, rangeWidth]);
  }

  static createYScale(minY, maxY, rangeHeight) {
    return (
      d3.scale
        .scaleLinear()
        .domain([minY, maxY])
        // We invert our range so it outputs using the axis that React uses.
        .range([rangeHeight, 0])
    );
  }

  // TODO: this could be done better! faster!
  static computeDistance(edges, currentEdge) {
    const index = edges.indexOf(currentEdge);
    const pathDone = edges.slice(0, index);
    return positionHelper.computeDistance(...pathDone);
  }

  static createAreaGraph(edges, graphWidth, graphHeight) {
    // TODO: create area foreach partition
    // const partitions = positionHelper.partitionPath(...edges);

    // Create our x-scale.
    const scaleX = ElevationProfile.createXScale(
      0,
      positionHelper.computeDistance(...edges),
      graphWidth
    );

    // Collect all y values.
    const altitudes = edges.reduce(
      (accu, location) => [...accu, location.src.altitude],
      []
    );

    // Get the min and max y value.
    const extentY = d3Array.extent(altitudes);

    // Create our y-scale.
    const scaleY = ElevationProfile.createYScale(0, extentY[1], graphHeight);

    // Use the d3-shape line generator to create the `d={}` attribute value.
    const areaShape = d3.shape
      .area()
      // For every x and y-point in our line shape we are given an item from our
      // array which we pass through our scale function so we map the domain value
      // to the range value.
      .x(d => scaleX(ElevationProfile.computeDistance(edges, d)))
      .y1(d => scaleY(d.src.altitude))
      .y0(extentY[1])
      .curve(d3.shape.curveNatural);

    return {
      // Pass in our array of data to our line generator to produce the `d={}`
      // attribute value that will go into our `<Shape />` component.
      path: areaShape(edges)
    };
  }

  render() {
    const { path } = this.props;
    const { width } = Dimensions.get("window");

    const lineGraph = ElevationProfile.createAreaGraph(path.edges, width, 100);

    return (
      <View style={styles.container}>
        <Surface width={width} height={100}>
          <Shape
            d={lineGraph.path}
            stroke="#fdb799"
            fill="#fdb799"
            strokeWidth={1}
          />
        </Surface>
      </View>
    );
  }
}
