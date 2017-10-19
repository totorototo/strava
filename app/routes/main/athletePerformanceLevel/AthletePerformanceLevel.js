import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import enhanceWithValidEntities from "../../../hocs/enhanceWithValidEntities";
import selector from "./selector";
import Progress from "../../../components/common/progress/Progress";

class AthletePerformanceLevel extends Component {
  static propTypes = {
    performance: PropTypes.shape({
      details: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          percent: PropTypes.number,
          values: PropTypes.number,
          unit: PropTypes.string
        }).isRequired
      ),
      value: PropTypes.number
    }).isRequired
  };

  render() {
    return <Progress progress={this.props.performance.value} />;
  }
}

export default compose(
  enhanceWithValidEntities(({ performance }) => [performance]),
  connect(selector)
)(AthletePerformanceLevel);
