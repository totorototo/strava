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

const ELEVATION_GRADE = {
  SMALL: 0,
  EASY: 1,
  MEDIUM: 2,
  DIFFICULT: 3,
  HARD: 4,
  UNKNOWN: 5
};

const ELEVATION_COLORS = {
  SMALL: "#f4f6f5",
  EASY: "#ECBC3E",
  MEDIUM: "#EA8827",
  DIFFICULT: "#E1351D",
  HARD: "#96451F",
  UNKNOWN: "#00451F"
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

  // TODO: to be moved
  static convertPercentToGrade = percent => {
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

  // TODO: to be moved
  static convertGradeToColor = grade => {
    if (grade === ELEVATION_GRADE.SMALL) {
      return ELEVATION_COLORS.SMALL;
    } else if (grade === ELEVATION_GRADE.EASY) {
      return ELEVATION_COLORS.EASY;
    } else if (grade === ELEVATION_GRADE.MEDIUM) {
      return ELEVATION_COLORS.MEDIUM;
    } else if (grade === ELEVATION_GRADE.HARD) {
      return ELEVATION_COLORS.HARD;
    } else if (grade === ELEVATION_GRADE.DIFFICULT) {
      return ELEVATION_COLORS.DIFFICULT;
    }
    return ELEVATION_COLORS.UNKNOWN;
  };

  // TODO: to be moved
  static addData = (...edges) => {
    let distanceDone = 0;
    return edges.reduce((accu, edge, index) => {
      const length = positionHelper.computeDistance(edge);
      distanceDone += length;
      const elevation = (edge.dest.altitude - edge.src.altitude) / 1000;
      const percent = elevation / length * 100;
      const grade = ElevationProfile.convertPercentToGrade(percent);
      const color = ElevationProfile.convertGradeToColor(grade);

      const enhancedEdge = {
        edge,
        length,
        percent,
        index,
        distanceDone,
        grade,
        color
      };
      return [...accu, enhancedEdge];
    }, []);
  };

  // TODO: to be moved
  static groupBy = (...edges) => {
    let currentGrade = "";
    return edges.reduce((accu, edge) => {
      if (currentGrade === edge.grade) {
        return [
          ...accu.slice(0, accu.length - 1),
          ...accu.slice(accu.length),
          [...accu[accu.length - 1], edge]
        ];
      }
      currentGrade = edge.grade;
      return [...accu, [edge]];
    }, []);
  };

  static createAreaGraph(edges, graphWidth, graphHeight) {
    const updatedEdges = ElevationProfile.addData(...edges);
    const sortedEdges = ElevationProfile.groupBy(...updatedEdges);

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

    return sortedEdges.map(section => {
      const areaShape = d3.shape
        .area()
        // For every x and y-point in our line shape we are given an item from our
        // array which we pass through our scale function so we map the domain value
        // to the range value.
        .x(d => scaleX(d.distanceDone))
        .y1(d => scaleY(d.edge.src.altitude))
        .y0(extentY[1])
        .curve(d3.shape.curveNatural);

      return {
        path: areaShape(section),
        color: section[0].color
      };
    });
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
