import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { View, Text, ScrollView, Image } from "react-native";
import { Card, Icon } from "react-native-elements";

import selector from "./selector";
import { isFaulty, getDefect, Loading } from "../../../dataDefinitions/defects";

import { getIconName } from "./helper";
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
    ).isRequired,
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string
      })
    ).isRequired
  };

  render() {
    const { club, clubMembers, activities } = this.props;
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
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Card
            containerStyle={styles.clubImageStyle}
            titleStyle={styles.card}
            title="LYBITOS - GRP 2017"
            image={{ uri: club.cover_photo }}
          >
            <Text style={styles.text}>
              Please find below anything related to Lybitos club: leaks, gossips
              and much more!
            </Text>
          </Card>
          <Card
            dividerStyle={styles.dividerStyle}
            containerStyle={styles.containerCardStyle}
            titleStyle={styles.card}
            title="MEMBERS"
          >
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

          {club.ranking &&
            <Card
              dividerStyle={styles.dividerStyle}
              ontainerStyle={styles.containerCardStyle}
              titleStyle={styles.card}
              title="AWARDS"
            >
              {Object.entries(club.ranking).map(([key, value]) =>
                <View style={styles.members}>
                  <Icon name={getIconName(key)} color="#FC4C02" />
                  <Text style={styles.text}>
                    {`${value.athlete}`}
                  </Text>
                </View>
              )}
            </Card>}
          <Card
            titleStyle={styles.card}
            title="ACTIVITIES"
            containerStyle={styles.containerCardStyle}
          >
            {activities.map(activity =>
              <View style={styles.members}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: activity.athlete.profile }}
                />
                <Text style={styles.text}>
                  {`${activity.name} ${activity.distance}m`}
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
