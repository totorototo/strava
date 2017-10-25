import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import enhanceWithValidEntities from "../../../hocs/enhanceWithValidEntities";
import selector from "./selector";
import AthleteCard from "../../../components/specific/cards/AthleteCard";
import AthletePerformancesCard from "../../../components/specific/cards/AthletePerformancesCard";
import ScrollableList from "../../../components/layout/scrollableList/ScrollableList";

class AthleteDetails extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profil: PropTypes.string
    }).isRequired,
    performances: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        percent: PropTypes.number,
        value: PropTypes.number,
        unit: PropTypes.string
      })
    ).isRequired
  };

  render() {
    const { athlete, performances } = this.props;
    return (
      <ScrollableList>
        <AthleteCard athlete={athlete} />
        <AthletePerformancesCard
          rendered={performances.length > 0}
          performances={performances}
        />
      </ScrollableList>
    );
  }
}

export default compose(
  enhanceWithValidEntities(({ athlete }) => [athlete]),
  connect(selector)
)(AthleteDetails);
