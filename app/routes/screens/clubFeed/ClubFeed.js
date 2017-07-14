import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { View, Text, ScrollView, Image } from "react-native";
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
    }).isRequired,
    clubMembers: PropTypes.arrayOf(
      PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        profile: PropTypes.string,
        country: PropTypes.string
      })
    ).isRequired
  };

  render() {
    const { club, clubMembers } = this.props;
    if (club === Loading)
      return (
        <View style={styles.container}>
          <Icon name="cached" color="#FC4C02" size={50} />
          <Text style={styles.text}>fetching data</Text>
        </View>
      );

    if (isFaulty(club))
      return (
        <View style={styles.container}>
          <Icon name="error" color="#FC4C02" size={100} />
          <Text style={styles.text}>
            Oops, I did it again: {getDefect(club)}
          </Text>
        </View>
      );

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
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
          <Card titleStyle={styles.card} title="MEMBERS">
            {clubMembers.map(member =>
              <View key={member.name} style={styles.members}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: member.profile }}
                />
                <Text style={styles.text}>
                  {member.firstname}
                </Text>
              </View>
            )}
          </Card>
        </ScrollView>
      </View>
    );
  }
}

export default connect(selector)(ClubFeed);
