import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Text } from "react-native";

import { connect } from "react-redux";

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
      performance: PropTypes.number
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
        if (progress > this.props.athlete.performance) {
          progress = this.props.athlete.performance;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }

  render() {
    const { athlete } = this.props;

    if (isFaulty(athlete))
      return (
        <Text>
          Fuck it, there is an issue: {getDefect(athlete)}
        </Text>
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
