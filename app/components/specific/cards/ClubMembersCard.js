import React, { Component } from "react";
import PropTypes from "prop-types";

import CardList from "../../common/cardList/CardList";

export default class ClubMembersCard extends Component {
  static propTypes = {
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
    const { clubMembers } = this.props;
    return (
      <CardList
        title={"MEMBERS"}
        list={clubMembers.map(member => ({
          key: member.id,
          image: member.profile,
          text: member.firstname
        }))}
      />
    );
  }
}
