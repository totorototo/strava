// react
import React, { Component, PropTypes } from "react";

// react-native
import { View, Text } from "react-native";

// redux
import { connect } from "react-redux";

// styles
import styles from "./styles";

class PerformanceMeter extends Component {
  static propTypes = {
    currentAthleteID: PropTypes.number.isRequired
  };

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
    return state.entities.athletes[id].performance;
  }
  return 0;
};

const mapStateToProps = state => ({
  currentAthleteID: state.appState["@@/data"].currentUserID,
  performance: getPerformanceValue(
    state,
    state.appState["@@/data"].currentUserID
  )
});

export default connect(mapStateToProps)(PerformanceMeter);
