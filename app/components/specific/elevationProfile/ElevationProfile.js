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
    // temp
    let distanceDone = 0;

    // helper
    const convertPercentToGrade = percent => {
      let grade;
      if (Math.abs(percent) < 5) {
        grade = "ELEVATION_GRADE.SMALL";
      } else if (Math.abs(percent) >= 5 && Math.abs(percent) < 7) {
        grade = "ELEVATION_GRADE.MEDIUM";
      } else if (Math.abs(percent) >= 7 && Math.abs(percent) < 10) {
        grade = "ELEVATION_GRADE.LARGE";
      } else if (Math.abs(percent) >= 10 && Math.abs(percent) < 15) {
        grade = "ELEVATION_GRADE.HUGE";
      } else if (Math.abs(percent) >= 15) {
        grade = "ELEVATION_GRADE.OHMYGOD";
      }
      return grade;
    };

    const convertGradeToColor = grade => {
      if (grade === "ELEVATION_GRADE.SMALL") {
        return "#f4f6f5";
      } else if (grade === "ELEVATION_GRADE.MEDIUM") {
        return "#ECBC3E";
      } else if (grade === "ELEVATION_GRADE.LARGE") {
        return "#EA8827";
      } else if (grade === "ELEVATION_GRADE.HUGE") {
        return "#E1351D";
      } else if (grade === "ELEVATION_GRADE.OHMYGOD") {
        return "#96451F";
      }
      return "#daaddd";
    };

    // add view model data
    const updatedEdges = edges.reduce((accu, edge, index) => {
      const length = positionHelper.computeDistance(edge);
      distanceDone += length;
      const elevation = (edge.dest.altitude - edge.src.altitude) / 1000;
      const percent = elevation / length * 100;
      const grade = convertPercentToGrade(percent);
      const color = convertGradeToColor(grade);

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

    // grouping by
    let currentGrade = "";
    const sortedEdges = updatedEdges.reduce((accu, edge) => {
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

    const areas = sortedEdges.map(section => {
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

    return areas;
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
