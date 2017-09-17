import React, { Component } from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import { connect } from "react-redux";

import {
  isFaulty,
  getDefect,
  IsLoading
} from "../../../dataDefinitions/defects";
import selector from "./selector";
import styles from "./styles";
import Loading from "../../../components/technical/loading/Loading";
import Faulty from "../../../components/technical/faulty/Faulty";
import AthleteCard from "../../../components/specific/cards/AthleteCard";
import AthleteDetailsCard from "../../../components/specific/cards/AthleteDetailsCard";

class Details extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profil: PropTypes.string
    }).isRequired
  };

  render() {
    const { athlete } = this.props;
    if (athlete === IsLoading) return <Loading />;

    if (isFaulty(athlete)) return <Faulty message={getDefect(athlete)} />;

    // TODO add idx https://github.com/facebookincubator/idx
    return (
      <ScrollView style={[styles.scroll]} showsVerticalScrollIndicator={false}>
        <AthleteCard athlete={athlete} />
        <AthleteDetailsCard
          rendered={
            athlete.performance &&
            athlete.performance.details &&
            athlete.performance.details.length > 0
          }
          athlete={athlete}
        />
      </ScrollView>
    );
  }
}

export default connect(selector)(Details);
