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
    performance: PropTypes.number.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.performance && this.props.performance !== 0
          ? <Text>
              {this.props.performance}
            </Text>
          : <Text>computing</Text>}
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
