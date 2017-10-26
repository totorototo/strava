import React, { Component } from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "react-native";

import styles from "./styles";

// https://pawelgrzybek.com/return-multiple-elements-from-a-component-with-react-16/
const Aux = props => props.children;

const Separator = () => <View style={styles.separator} />;

export default class ScrollableList extends Component {
  static propTypes = {
    children: PropTypes.node,
    alignItems: PropTypes.oneOf(["center", "top", "full"])
  };

  static defaultProps = {
    children: [],
    alignItems: "top"
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles[this.props.alignItems]}
      >
        {this.props.children.length > 0
          ? this.props.children.map((item, index) => (
              <Aux key={index.toString()}>
                {item}
                {this.props.children.length - 1 !== index && <Separator />}
              </Aux>
            ))
          : this.props.children}
      </ScrollView>
    );
  }
}
