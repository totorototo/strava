import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Text, Image } from "react-native";

import { connect } from "react-redux";
import { isFaulty, getDefect } from "../../../dataDefinitions/defects";
import { getCurrentUserID } from "../../../store/state/appState/selectors";
import { getEntity } from "../../../store/state/entities/selectors";

import styles from "./styles";

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
    if (isFaulty(athlete))
      return (
        <Text>
          Fuck it, there is an issue: {getDefect(athlete)}
        </Text>
      );

    return (
      <View style={styles.home}>
        <Image source={{ uri: athlete.profile }} style={styles.image} />
        <Text style={styles.text}>
          {athlete.firstname}
        </Text>
        <Text style={styles.text}>
          {athlete.lastname}
        </Text>
      </View>
    );
  }
}

const getAthlete = (state, id) => getEntity(state, "athletes", id);

const mapStateToProps = state => {
  const currentUserID = getCurrentUserID(state);
  return {
    athlete: getAthlete(state, currentUserID)
  };
};

export default connect(mapStateToProps)(Details);
