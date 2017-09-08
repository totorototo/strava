import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, ScrollView } from "react-native";
import { Card } from "react-native-elements";

import selector from "./selector";
import {
  isFaulty,
  getDefect,
  IsLoading
} from "../../../dataDefinitions/defects";
import { getIconName } from "./helper";
import styles from "./styles";
import Faulty from "../../../components/technical/faulty/Faulty";
import Loading from "../../../components/technical/loading/Loading";
import CardList from "../../../components/common/cardList/CardList";
import theme from "../../../theme/theme";
import Paragraph from "../../../components/typography/paragraph/Paragraph";

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
    if (club === IsLoading) return <Loading />;

    if (isFaulty(club)) return <Faulty message={getDefect(club)} />;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Card
            containerStyle={styles.clubImageStyle}
            titleStyle={styles.card}
            title="LYBITOS"
            image={{ uri: club.cover_photo }}
          >
            <Paragraph>
              Please find below anything related to Lybitos club: leaks, gossips
              and much more!
            </Paragraph>
          </Card>

          <CardList
            title={"MEMBERS"}
            list={clubMembers.map(member => ({
              key: member.id,
              image: member.profile,
              text: member.firstname
            }))}
          />

          <CardList
            title={"AWARDS"}
            list={Object.entries(club.ranking).map(([key, value]) => ({
              key,
              image: { name: getIconName(key), color: theme.PrimaryColor },
              text: value.athlete
            }))}
          />

          <CardList
            title={"ACTIVITIES"}
            list={activities.map((activity, index) => ({
              key: index,
              image: activity.athlete.profile,
              text: activity.name
            }))}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(selector)(ClubFeed);
