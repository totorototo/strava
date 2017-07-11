import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { View, Text } from "react-native";
import { Card, Button } from "react-native-elements";

import { getCurrentClubID } from "../../../store/state/appState/selectors";
import { getEntity } from "../../../store/state/entities/selectors";
import { isFaulty, getDefect } from "../../../dataDefinitions/defects";

import styles from "./styles";

// styles
class ClubFeed extends Component {
  static propTypes = {
    club: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      city: PropTypes.string,
      members: PropTypes.array,
      cover_photo: PropTypes.string,
      url: PropTypes.string
    }).isRequired
  };

  render() {
    const { club } = this.props;
    if (isFaulty(club))
      return (
        <Text>
          Fuck it, there is an issue: {getDefect(club)}
        </Text>
      );

    return (
      <View style={styles.container}>
        <Card
          titleStyle={styles.card}
          title="LYBITOS - GRP 2017"
          image={{ uri: club.cover_photo }}
        >
          <Text style={styles.text}>
            Please find below anything related to Lybitos club: leaks, gossips
            and much more!
          </Text>
          <Button
            icon={{ name: "code" }}
            backgroundColor="#FC4C02"
            buttonStyle={styles.button}
            title="VIEW NOW"
          />
        </Card>
      </View>
    );
  }
}

const getClub = (state, id) => getEntity(state, "clubs", id);

const mapStateToProps = state => {
  const currentClubID = getCurrentClubID(state);
  return {
    club: getClub(state, currentClubID)
  };
};

export default connect(mapStateToProps)(ClubFeed);
