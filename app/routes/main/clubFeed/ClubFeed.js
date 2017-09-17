import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ScrollView } from "react-native";

import selector from "./selector";
import {
  isFaulty,
  getDefect,
  IsLoading
} from "../../../dataDefinitions/defects";
import styles from "./styles";
import Faulty from "../../../components/technical/faulty/Faulty";
import Loading from "../../../components/technical/loading/Loading";
import ClubCard from "../../../components/specific/cards/ClubCard";
import ClubAwardsCard from "../../../components/specific/cards/ClubAwardsCard";
import ClubMembersCard from "../../../components/specific/cards/ClubMembersCard";
import ClubActivitiesCard from "../../../components/specific/cards/ClubActivitiesCard";

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
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ClubCard club={club} />
        <ClubMembersCard clubMembers={clubMembers} />
        <ClubAwardsCard club={club} />
        <ClubActivitiesCard activities={activities} />
      </ScrollView>
    );
  }
}

export default connect(selector)(ClubFeed);
