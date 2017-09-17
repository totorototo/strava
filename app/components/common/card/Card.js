import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card as NativeCard } from "react-native-elements";

import styles from "./styles";

export default class Card extends Component {
  static propTypes = {
    title: NativeCard.propTypes.title.isRequired,
    children: PropTypes.node,
    image: NativeCard.propTypes.image.isRequired
  };

  static defaultProps = {
    list: [],
    children: null
  };

  render() {
    return (
      <NativeCard
        dividerStyle={styles.dividerStyle}
        containerStyle={styles.containerCardStyle}
        titleStyle={styles.card}
        image={this.props.image}
        title={this.props.title}
      >
        {this.props.children}
      </NativeCard>
    );
  }
}
