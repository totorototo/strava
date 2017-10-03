import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { View } from "react-native";

import enhanceWithValidEntities from "../../../hocs/enhanceWithValidEntities";
import selector from "./selector";
import styles from "./styles";
import Progress from "../../../components/common/progress/Progress";

class AthletePerformanceLevel extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profil: PropTypes.string,
      performance: PropTypes.any
    }).isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <Progress
          progress={
            this.props.athlete.performance
              ? this.props.athlete.performance.value
              : NaN
          }
        />
      </View>
    );
  }
}

export default compose(
  enhanceWithValidEntities(({ athlete }) => [athlete]),
  connect(selector)
)(AthletePerformanceLevel);
