import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { View, Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";

import selector from "./selector";
import { isFaulty, getDefect, Loading } from "../../../dataDefinitions/defects";

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
    if (club === Loading)
      return (
        <View style={styles.container}>
          <Icon name="cached" color="#FC4C02" size={50} />
          <Text style={styles.text}>fetching data</Text>
        </View>
      );

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

export default connect(selector)(ClubFeed);
