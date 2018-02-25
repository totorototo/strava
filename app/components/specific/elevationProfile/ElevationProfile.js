import React, { Component } from "react";
import { last, flatten } from "lodash";
import PropTypes from "prop-types";
import { View, ART, Dimensions } from "react-native";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as d3Array from "d3-array";

import positionHelper from "../../../store/services/helpers/gps";
import styles from "./styles";
import { ELEVATION_GRADE } from "../../../store/constants/elevation";

const { Surface, Shape } = ART;
const d3 = {
  scale,
  shape,
  d3Array
};

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

const groupEdgesByRange = function(accu, item) {
  const val = getRange(item.percent);
  // eslint-disable-next-line no-param-reassign
  accu[val] = accu[val] || [];
  accu[val].push(item);
  return accu;
};

const groupEdgesBySequence = function(result, value, index, collection) {
  if (index > 0 && value.index - collection[index - 1].index === 1) {
    const group = last(result);
    group.push(value);
  } else {
    result.push([value]);
  }
  return result;
};

// eslint-disable-next-line no-extend-native
Array.prototype.groupBy = function(fn, accu) {
  return this.reduce(fn, accu);
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

  static createColorScale2() {
    return d3.scale
      .scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(["#f2f0f7", "#ECBC3E", "#EA8827", "#E1351D", "#96451F"]);
  }

  static createAreaGraph(edges, graphWidth, graphHeight) {
    const groupedEdgesByRange = edges.groupBy(groupEdgesByRange, {});

    const groupedEdgesBySequence = {};
    Object.entries(groupedEdgesByRange).forEach(([range, section]) => {
      groupedEdgesBySequence[range] = section.groupBy(groupEdgesBySequence, []);
    });

    // Create our x-scale.
    const scaleX = ElevationProfile.createXScale(
      0,
      positionHelper.computeDistance(...edges),
      graphWidth
    );

    const colorScale = ElevationProfile.createColorScale2();

    // Collect all y values.
    const altitudes = edges.reduce(
      (accu, location) => [...accu, location.src.altitude],
      []
    );

    // Get the min and max y value.
    const extentY = d3Array.extent(altitudes);

    // Create our y-scale.
    const scaleY = ElevationProfile.createYScale(0, extentY[1], graphHeight);

    const test = Object.entries(
      groupedEdgesBySequence
    ).map(([grade, sequences]) =>
      sequences.map(sequence => {
        const areaShape = d3.shape
          .area()
          // For every x and y-point in our line shape we are given an item from our
          // array which we pass through our scale function so we map the domain value
          // to the range value.
          .x(d => scaleX(d.distanceDone))
          .y1(d => scaleY(d.src.altitude))
          .defined(d => typeof d.value !== "string")
          .y0(extentY[1])
          .curve(d3.shape.curveNatural);

        return {
          path: areaShape(sequence),
          color: colorScale(grade)
        };
      })
    );

    const sections = Object.values(test).map(sequences =>
      sequences.map(item => item)
    );
    return flatten(sections);
  }

  render() {
    const { path } = this.props;
    const { width } = Dimensions.get("window");

    const areas = ElevationProfile.createAreaGraph(path.edges, width, 100);

    return (
      <View style={styles.container}>
        <Surface width={width} height={100}>
          {areas.map(area => (
            <Shape
              d={area.path}
              stroke={area.color}
              fill={area.color}
              strokeWidth={1}
            />
          ))}
        </Surface>
      </View>
    );
  }
}
