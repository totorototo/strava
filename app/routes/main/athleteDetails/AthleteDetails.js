import React, { Component } from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";

import enhanceWithValidEntities from "../../../hocs/enhanceWithValidEntities";
import selector from "./selector";
import styles from "./styles";
import AthleteCard from "../../../components/specific/cards/AthleteCard";
import AthletePerformancesCard from "../../../components/specific/cards/AthletePerformancesCard";

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
      <ScrollView style={[styles.scroll]} showsVerticalScrollIndicator={false}>
        <AthleteCard athlete={athlete} />
        <AthletePerformancesCard
          rendered={performances.length > 0}
          performances={performances}
        />
      </ScrollView>
    );
  }
}

export default compose(
  enhanceWithValidEntities(({ athlete }) => [athlete]),
  connect(selector)
)(AthleteDetails);
