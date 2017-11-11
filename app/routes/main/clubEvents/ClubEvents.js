/* eslint-disable react-native/no-color-literals */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";

import enhanceWithValidEntities from "../../../hocs/enhanceWithValidEntities";
import CountDown from "../../../components/specific/countdown/Countdown";
import selector from "./selector";
import mapDispatchToProps from "./mapDispatchToProps";
import Link from "../../../components/typography/link/Link";
import RaceMap from "../../../components/specific/map/RaceMap";
import CollapsableDrawer from "../../../components/specific/collapsableDrawer/CollapsableDrawer";

// fix me -> remove
const styles = StyleSheet.create({
  bubble: {
    // todo handle transparency theme
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    position: "absolute",
    bottom: 20,
    alignSelf: "center"
  }
});

class ClubEvents extends Component {
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

    return [
      <RaceMap key="1" race={race} clubMembers={clubMembers} />,
      <CollapsableDrawer key="2">
        <CountDown date={race.date} />
      </CollapsableDrawer>,
      <View style={styles.bubble} key="3">
        <Link onPress={shareLocation}>Spot me!</Link>
      </View>
    ];
  }
}

export default compose(
  enhanceWithValidEntities(({ race }) => [race]),
  connect(selector, mapDispatchToProps)
)(ClubEvents);
