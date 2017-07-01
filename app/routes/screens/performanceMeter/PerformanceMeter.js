import React, { Component } from "react";
import PropTypes from "prop-types";

import { View } from "react-native";

import { connect } from "react-redux";

import { Circle } from "react-native-progress";

import styles from "./styles";

class PerformanceMeter extends Component {
  static propTypes = {
    performance: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      indeterminate: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.performance &&
      nextProps.performance !== this.props.performance
    ) {
      this.animate();
    }
  }

  // TODO: define animation (linear, interpolation and cie).
  animate() {
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > this.props.performance) {
          progress = this.props.performance;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Circle
          progress={this.state.progress}
          indeterminate={this.state.indeterminate}
          showsText
          size={200}
          color="#FC4C02"
          borderColor="#FC4C02"
          unifiledColor="#559988"
        />
      </View>
    );
  }
}

const getPerformanceValue = (state, id) => {
  if (id !== undefined && id !== 0 && state.entities.athletes) {
    return state.entities.athletes[id].performance || 0;
  }
  return 0;
};

const mapStateToProps = state => ({
  performance: getPerformanceValue(
    state,
    state.appState["@@/data"].currentUserID
  )
});

export default connect(mapStateToProps)(PerformanceMeter);
