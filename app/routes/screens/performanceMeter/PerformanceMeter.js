// react
import React, { Component, PropTypes } from "react";

// react-native
import { View, Text } from "react-native";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// actions
import { getCurrentAthleteStats } from "../../../store/actions/athlete";

// styles
import styles from "./styles";

class PerformanceMeter extends Component {
  static propTypes = {
    currentAthleteStateAction: PropTypes.func.isRequired,
    currentAthleteID: PropTypes.number.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentAthleteID !== undefined &&
        nextProps.currentAthleteID !== 0 &&
        nextProps.currentAthleteID !== this.props.currentAthleteID
    ) {
      this.props.currentAthleteStateAction();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>profit formula to be defined!</Text>
        <Text>Will you be a Bitos ?</Text>
        <Text>Or one of the few LYB on earth....</Text>
      </View>
    );
  }
}

const getPerformanceValue = (state, id) => {
  if (id !== undefined && id !== 0 && state.entities.athletes) {
    return state.entities.athletes[id].performanceIndicator;
  }
  return 0;
};

const mapDispatchToProps = dispatch => ({
  currentAthleteStateAction: bindActionCreators(
    getCurrentAthleteStats,
    dispatch
  )
});

const mapStateToProps = state => ({
  currentAthleteID: state.appState["@@/data"].currentUserID,
  performanceIndicator: getPerformanceValue(
    state,
    state.appState["@@/data"].currentUserID
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceMeter);
