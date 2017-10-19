import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import enhanceWithValidEntities from "../../../hocs/enhanceWithValidEntities";
import selector from "./selector";
import AthleteCard from "../../../components/specific/cards/AthleteCard";
import AthleteDetailsCard from "../../../components/specific/cards/AthleteDetailsCard";
import ScrollableList from "../../../components/layout/scrollableList/ScrollableList";

class AthleteDetails extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profil: PropTypes.string
    }).isRequired
  };

  render() {
    const { athlete } = this.props;
    // TODO add idx https://github.com/facebookincubator/idx
    return (
      <ScrollableList>
        <AthleteCard athlete={athlete} />
        <AthleteDetailsCard
          rendered={
            athlete.performance &&
            athlete.performance.details &&
            athlete.performance.details.length > 0
          }
          athlete={athlete}
        />
      </ScrollableList>
    );
  }
}

export default compose(
  enhanceWithValidEntities(({ athlete }) => [athlete]),
  connect(selector)
)(AthleteDetails);
