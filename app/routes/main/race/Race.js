import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";

import enhanceWithValidEntities from "../../../hocs/enhanceWithValidEntities";
import CountDown from "../../../components/specific/countdown/Countdown";
import styles from "./styles";
import {
  isFaulty,
  getDefect,
  IsLoading
} from "../../../dataDefinitions/defects";
import selector from "./selector";
import mapDispatchToProps from "./mapDispatchToProps";
import Loading from "../../../components/technical/loading/Loading";
import Faulty from "../../../components/technical/faulty/Faulty";
import Link from "../../../components/typography/link/Link";
import RaceMap from "../../../components/specific/map/RaceMap";
import CollapsableDrawer from "../../../components/specific/collapsableDrawer/CollapsableDrawer";

class RacePredictor extends Component {
  static propTypes = {
    race: PropTypes.shape({
      date: PropTypes.string,
      path: PropTypes.shape({
        coordinates: PropTypes.arrayOf(
          PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number
          })
        )
      }),
      runners: PropTypes.string,
      checkPoints: PropTypes.arrayOf(
        PropTypes.shape({
          identifier: PropTypes.string,
          title: PropTypes.string,
          description: PropTypes.string,
          coordinates: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number
          })
        })
      )
    }).isRequired,
    clubMembers: PropTypes.arrayOf(
      PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        profile: PropTypes.string,
        country: PropTypes.string
      })
    ).isRequired,
    shareLocation: PropTypes.func.isRequired
  };

  render() {
    const { race, clubMembers, shareLocation } = this.props;

    if (race === IsLoading) return <Loading />;

    if (isFaulty(race)) return <Faulty message={getDefect(race)} />;

    return (
      <View style={styles.container}>
        <RaceMap race={race} clubMembers={clubMembers} />
        <CollapsableDrawer>
          <CountDown date={race.date} />
        </CollapsableDrawer>
        <View style={[styles.buttonContainer, styles.bubble]}>
          <Link onPress={shareLocation}>Spot me!</Link>
        </View>
      </View>
    );
  }
}

export default compose(
  enhanceWithValidEntities(({ race }) => [race]),
  connect(selector, mapDispatchToProps)
)(RacePredictor);
