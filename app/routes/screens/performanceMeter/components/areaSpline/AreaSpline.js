import React from "react";
import PropTypes from "prop-types";

import { View, ART } from "react-native";
import * as shape from "d3-shape";
import * as format from "d3-format";
import * as axis from "d3-axis";

import AnimatedShape from "../animatedShape/AnimatedShape";

const { Surface, Group } = ART;

const d3 = {
  shape,
  format,
  axis
};

const margin = 20;

class AreaSpline extends React.Component {
  // eslint-disable-next-line no-unused-vars
  static Yvalue(item, index) {
    return -item.value;
  }

  // eslint-disable-next-line no-unused-vars
  static Xvalue(item, index) {
    return index * 15;
  }

  // eslint-disable-next-line no-unused-vars
  static label(item, index) {
    return item.name;
  }

  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        year: PropTypes.number
      })
    ).isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.createArea = this.createArea.bind(this);
    this.Xvalue = AreaSpline.Xvalue.bind(this);
    this.Yvalue = AreaSpline.Yvalue.bind(this);
    this.label = AreaSpline.label.bind(this);
  }

  // method that transforms data into a svg path (should be exposed as part of the AreaSpline interface)
  createArea() {
    const area = d3.shape
      .area()
      .x((d, index) => this.Xvalue(d, index))
      .y1((d, index) => this.Yvalue(d, index))
      .curve(d3.shape.curveNatural)(this.props.data);

    // console.debug(`area: ${JSON.stringify(area)}`);

    return { path: area };
  }

  render() {
    const x = margin + 50;
    const y = this.props.height - margin;

    return (
      <View width={this.props.width} height={this.props.height}>
        <Surface width={this.props.width} height={this.props.height}>
          <Group x={x} y={y}>
            <AnimatedShape
              color={this.props.color}
              d={() => this.createArea()}
            />
          </Group>
        </Surface>
      </View>
    );
  }
}

export default AreaSpline;
