import React from "react";
import PropTypes from "prop-types";

import { Text, View, ART, TouchableWithoutFeedback } from "react-native";

import * as scale from "d3-scale";
import * as shape from "d3-shape";

import AnimatedShape from "../animatedShape/AnimatedShape";
import Theme from "../../colors";

import styles from "./styles";

const { Surface, Group } = ART;

const d3 = {
  scale,
  shape
};

class Pie extends React.Component {
  static value(item) {
    return item.number;
  }

  static label(item) {
    return item.name;
  }

  static color(index) {
    return Theme.colors[index];
  }

  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        year: PropTypes.number
      })
    ).isRequired,
    pieWidth: PropTypes.number.isRequired,
    pieHeight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    onItemSelected: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { highlightedIndex: 0 };
    this.createPieChart = this.createPieChart.bind(this);
    this.value = Pie.value.bind(this);
    this.label = Pie.label.bind(this);
    this.color = Pie.color.bind(this);
    this.onPieItemSelected = this.onPieItemSelected.bind(this);
  }

  onPieItemSelected(index) {
    this.setState({ ...this.state, highlightedIndex: index });
    this.props.onItemSelected(index);
  }

  createPieChart(index) {
    const arcs = d3.shape.pie().value(this.value)(this.props.data);

    const hightlightedArc = d3.shape
      .arc()
      .outerRadius(this.props.pieWidth / 2 + 10)
      .padAngle(0.05)
      .innerRadius(30);

    const arc = d3.shape
      .arc()
      .outerRadius(this.props.pieWidth / 2)
      .padAngle(0.05)
      .innerRadius(30);

    const arcData = arcs[index];
    const path =
      this.state.highlightedIndex === index
        ? hightlightedArc(arcData)
        : arc(arcData);

    return {
      path,
      color: this.color(index)
    };
  }

  render() {
    const margin = 20;
    const x = this.props.pieWidth / 2 + margin + 50;
    const y = this.props.pieHeight / 2 + margin;

    return (
      <View
        style={styles.container}
        width={this.props.width}
        height={this.props.height}
      >
        <Surface width={this.props.width} height={this.props.height}>
          <Group x={x} y={y}>
            {this.props.data.map((item, index) =>
              <AnimatedShape
                key={`pie_shape_${item.name}`}
                color={this.color(index)}
                d={() => this.createPieChart(index)}
              />
            )}
          </Group>
        </Surface>
        <View
          style={[
            styles.view,
            {
              top: margin,
              left: 2 * margin + 50 + this.props.pieWidth
            }
          ]}
        >
          {this.props.data.map((item, index) => {
            const fontWeight =
              this.state.highlightedIndex === index ? "bold" : "normal";
            return (
              <TouchableWithoutFeedback
                key={`text${item.name}`}
                onPress={() => this.onPieItemSelected(index)}
              >
                <View>
                  <Text
                    style={[
                      styles.label,
                      { color: this.color(index), fontWeight }
                    ]}
                  >
                    {this.label(item)}: {this.value(item)}%
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    );
  }
}

export default Pie;
