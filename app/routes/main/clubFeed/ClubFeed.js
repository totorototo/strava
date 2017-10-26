import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import enhanceWithValidEntities from "../../../hocs/enhanceWithValidEntities";
import selector from "./selector";
import ClubCard from "../../../components/specific/cards/ClubCard";
import ClubAwardsCard from "../../../components/specific/cards/ClubAwardsCard";
import ClubMembersCard from "../../../components/specific/cards/ClubMembersCard";
import ClubActivitiesCard from "../../../components/specific/cards/ClubActivitiesCard";
import ScrollableList from "../../../components/layout/scrollableList/ScrollableList";

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
      <ScrollableList>
        <ClubCard club={club} />
        <ClubMembersCard clubMembers={clubMembers} />
        <ClubAwardsCard club={club} />
        <ClubActivitiesCard activities={activities} />
      </ScrollableList>
    );
  }
}

export default compose(
  enhanceWithValidEntities(({ club }) => [club]),
  connect(selector)
)(ClubFeed);
