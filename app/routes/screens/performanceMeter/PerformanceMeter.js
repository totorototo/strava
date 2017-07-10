import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

import { Circle } from "react-native-progress";

import { isFaulty, getDefect } from "../../../dataDefinitions/defects";

import { getCurrentUserID } from "../../../store/state/appState/selectors";
import { getEntity } from "../../../store/state/entities/selectors";

import styles from "./styles";

class PerformanceMeter extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profil: PropTypes.string,
      performance: PropTypes.any
    }).isRequired
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
      nextProps.athlete &&
      nextProps.athlete.performance !== this.props.athlete.performance
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
        if (progress > this.props.athlete.performance.value) {
          progress = this.props.athlete.performance.value;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }

  render() {
    const { athlete } = this.props;
    if (isFaulty(athlete))
      return (
        <View style={styles.container}>
          <Icon name="watch" color="#FC4C02" size={100} />
          <Text style={styles.text}>
            Oops, I did it again: {getDefect(athlete)}
          </Text>
        </View>
      );

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

const getAthlete = (state, id) => getEntity(state, "athletes", id);

const mapStateToProps = state => {
  const currentUserID = getCurrentUserID(state);
  return {
    athlete: getAthlete(state, currentUserID)
  };
};

export default connect(mapStateToProps)(PerformanceMeter);
