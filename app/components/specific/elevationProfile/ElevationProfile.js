import React, { Component } from "react";
import PropTypes from "prop-types";
import { xor, concat } from "lodash";
import { View, ART, Dimensions } from "react-native";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as d3Array from "d3-array";

import gps from "../../../store/services/helpers/gps";
import styles from "./styles";
import {
  ELEVATION_COLORS,
  ELEVATION_GRADE
} from "../../../store/constants/elevation";

const { Surface, Shape } = ART;
const d3 = {
  scale,
  shape,
  d3Array
};

// TODO: how? where? what?
const getRange = percent => {
  if (Math.abs(percent) < 5) {
    return ELEVATION_GRADE.SMALL;
  } else if (Math.abs(percent) >= 5 && Math.abs(percent) < 7) {
    return ELEVATION_GRADE.EASY;
  } else if (Math.abs(percent) >= 7 && Math.abs(percent) < 10) {
    return ELEVATION_GRADE.MEDIUM;
  } else if (Math.abs(percent) >= 10 && Math.abs(percent) < 15) {
    return ELEVATION_GRADE.DIFFICULT;
  } else if (Math.abs(percent) >= 15) {
    return ELEVATION_GRADE.HARD;
  }
  return ELEVATION_GRADE.UNKNOWN;
};

// eslint-disable-next-line no-extend-native
Array.prototype.groupBy = function groupBy(fn) {
  return this.reduce((accu, item, index, array) => {
    const key = fn(item, item, array);
    // eslint-disable-next-line no-param-reassign
    accu[key] = accu[key] || [];
    accu[key].push(item);
    return accu;
  }, {});
};

export default class ElevationProfile extends Component {
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

  static createColorScale() {
    return d3.scale
      .scaleThreshold()
      .domain([1, 2, 3, 4])
      .range([
        ELEVATION_COLORS.SMALL,
        ELEVATION_COLORS.EASY,
        ELEVATION_COLORS.MEDIUM,
        ELEVATION_COLORS.DIFFICULT,
        ELEVATION_COLORS.HARD
      ]);
  }

  static createXAxisTicks(edges, graphWidth, graphHeight) {
    const distance = gps.computeDistance(...edges);
    const tickInterval = 10; // in kms
    const checkPointNumber = Math.floor(distance / tickInterval);

    const checkPoints = [];
    for (let i = 0; i <= checkPointNumber; i += 1) {
      const checkPointDistance = tickInterval * i;
      checkPoints.push(checkPointDistance);
    }

    const ticksIndices = gps.getCheckpointsIndices(checkPoints, 0.1, ...edges);
    const filteredEdges = ticksIndices.map(index => edges[index]);

    // Create our x-scale.
    const scaleX = ElevationProfile.createXScale(
      0,
      gps.computeDistance(...edges),
      graphWidth
    );

    // Collect all y values.
    const altitudes = edges.map(location => location.src.altitude);

    // Get the min and max y value.
    const extentY = d3Array.extent(altitudes);

    // Create our y-scale.
    const scaleY = ElevationProfile.createYScale(
      extentY[0],
      extentY[1],
      graphHeight
    );

    return filteredEdges.map(edge => {
      const areaShape = d3.shape
        .line()
        // For every x and y-point in our line shape we are given an item from our
        // array which we pass through our scale function so we map the domain value
        // to the range value.
        .x(d => scaleX(d.distanceDone))
        .y(d => scaleY(d.src.altitude));

      return {
        path: areaShape(edge)
      };
    });
  }

  static createYAxis(edges, graphWidth, graphHeight) {
    // Collect all y values.
    const altitudes = edges.map(location => location.src.altitude);

    // Get the min and max y value.
    const extentY = d3Array.extent(altitudes);

    // Create our y-scale.
    const scaleY = ElevationProfile.createYScale(
      extentY[0],
      extentY[1],
      graphHeight
    );

    const scaleX = ElevationProfile.createXScale(0, 0, graphWidth);

    const lineShape = d3.shape
      .line()
      // For every x and y-point in our line shape we are given an item from our
      // array which we pass through our scale function so we map the domain value
      // to the range value.
      .x(scaleX(0))
      .y(d => scaleY(d));

    return {
      // Pass in our array of data to our line generator to produce the `d={}`
      // attribute value that will go into our `<Shape />` component.
      path: lineShape(extentY)
    };
  }

  static createXAxis(edges, graphWidth, graphHeight) {
    // TODO: temp solution!!
    const data = [];
    data.push(edges[0]);
    data.push(edges[edges.length - 1]);

    const scaleX = ElevationProfile.createXScale(
      0,
      gps.computeDistance(...edges),
      graphWidth
    );
    const scaleY = ElevationProfile.createYScale(0, 0, graphHeight);

    const lineShape = d3.shape
      .line()
      // For every x and y-point in our line shape we are given an item from our
      // array which we pass through our scale function so we map the domain value
      // to the range value.
      .x(d => scaleX(d.distanceDone))
      .y(scaleY(0));

    return {
      // Pass in our array of data to our line generator to produce the `d={}`
      // attribute value that will go into our `<Shape />` component.
      path: lineShape(data)
    };
  }

  static createAreaGraph(edges, graphWidth, graphHeight) {
    const groupedEdgesByRange = edges.groupBy(item => getRange(item.percent));

    // eslint-disable-next-line
    const data = Object.entries(groupedEdgesByRange).map(([grade, section]) => {
      const indices = section.map(item => item.index);
      const missingValueIndices = xor(
        Array.from(Array(edges.length).keys()),
        indices
      );
      const fakeData = missingValueIndices.map(item => ({
        index: item,
        fake: true
      }));
      return concat(section, fakeData).sort((a, b) => a.index - b.index);
    });

    // Create our x-scale.
    const scaleX = ElevationProfile.createXScale(
      0,
      gps.computeDistance(...edges),
      graphWidth
    );

    const colorScale = ElevationProfile.createColorScale();

    // Collect all y values.
    const altitudes = edges.map(location => location.src.altitude);

    // Get the min and max y value.
    const extentY = d3Array.extent(altitudes);

    // Create our y-scale.
    const scaleY = ElevationProfile.createYScale(
      extentY[0],
      extentY[1],
      graphHeight
    );

    return Object.entries(data).map(([grade, section]) => {
      const areaShape = d3.shape
        .area()
        // For every x and y-point in our line shape we are given an item from our
        // array which we pass through our scale function so we map the domain value
        // to the range value.
        .x(d => scaleX(d.distanceDone))
        .y1(d => scaleY(d.src.altitude))
        .y0(extentY[1])
        .defined(d => !d.fake)
        .curve(d3.shape.curveLinear);

      return {
        path: areaShape(section),
        color: colorScale(grade)
      };
    });
  }

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

  render() {
    const { path } = this.props;
    const { width } = Dimensions.get("window");

    const areas = ElevationProfile.createAreaGraph(path.edges, width, 100);
    const xAxis = ElevationProfile.createXAxis(path.edges, width, 100);
    const yAxis = ElevationProfile.createYAxis(path.edges, width, 100);
    // const xTicks = ElevationProfile.createXAxisTicks(path.edges, width, 100);

    return (
      <View style={styles.container}>
        <Surface width={width} height={100}>
          {areas.map(area => (
            <Shape
              d={area.path}
              stroke={area.color}
              fill={area.color}
              strokeWidth={0.15}
            />
          ))}
          <Shape d={xAxis.path} stroke="#000" strokeWidth={3} />
          <Shape d={yAxis.path} stroke="#000" strokeWidth={3} />
        </Surface>
      </View>
    );
  }
}
