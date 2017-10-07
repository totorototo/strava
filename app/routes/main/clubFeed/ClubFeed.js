import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import { compose } from "redux";

import enhanceWithValidEntities from "../../../hocs/enhanceWithValidEntities";
import selector from "./selector";
import styles from "./styles";
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

export default compose(
  enhanceWithValidEntities(({ club }) => [club]),
  connect(selector)
)(ClubFeed);
