import React, { Component } from "react";
import PropTypes from "prop-types";

import CardList from "../../common/cardList/CardList";

export default class ClubActivitiesCard extends Component {
  static propTypes = {
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string
      })
    ).isRequired
  };

  render() {
    const { activities } = this.props;
    return (
      <CardList
        title="ACTIVITIES"
        list={activities.map((activity, index) => ({
          key: index,
          image: activity.athlete.profile,
          text: activity.name
        }))}
      />
    );
  }
}
