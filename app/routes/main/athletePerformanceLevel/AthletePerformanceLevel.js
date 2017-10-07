import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View } from "react-native";
import { compose } from "redux";

import enhanceWithValidEntities from "../../../hocs/enhanceWithValidEntities";
import selector from "./selector";
import styles from "./styles";
import Progress from "../../../components/common/progress/Progress";

class AthletePerformanceLevel extends Component {
  static propTypes = {
    performance: PropTypes.shape({
      details: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          percent: PropTypes.number,
          values: PropTypes.number,
          unit: PropTypes.number
        }).isRequired
      ),
      value: PropTypes.number.isRequired
    }).isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <Progress progress={this.props.performance.value} />
      </View>
    );
  }
}

export default compose(
  enhanceWithValidEntities(({ performance }) => [performance]),
  connect(selector)
)(AthletePerformanceLevel);
