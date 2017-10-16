import React, { Component } from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import idx from "idx";

import enhanceWithValidEntities from "../../../hocs/enhanceWithValidEntities";
import selector from "./selector";
import styles from "./styles";
import AthleteCard from "../../../components/specific/cards/AthleteCard";
import AthleteDetailsCard from "../../../components/specific/cards/AthleteDetailsCard";

class AthleteDetails extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profil: PropTypes.string
    }).isRequired
  };

  static getPerformanceDetails(props) {
    return idx(props, _ => _.performance.details);
  }

  render() {
    const { athlete } = this.props;
    const details = AthleteDetails.getPerformanceDetails(athlete);
    return (
      <ScrollView style={[styles.scroll]} showsVerticalScrollIndicator={false}>
        <AthleteCard athlete={athlete} />
        <AthleteDetailsCard
          rendered={details && details.length > 0}
          athlete={athlete}
        />
      </ScrollView>
    );
  }
}

export default compose(
  enhanceWithValidEntities(({ athlete }) => [athlete]),
  connect(selector)
)(AthleteDetails);
