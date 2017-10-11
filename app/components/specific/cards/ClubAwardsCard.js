import React, { Component } from "react";
import PropTypes from "prop-types";

import CardList from "../../common/cardList/CardList";
import { getIconName } from "../../../routes/main/clubFeed/helper";
import theme from "../../../theme/theme";

export default class ClubAwardsCard extends Component {
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
    return (
      <CardList
        title="AWARDS"
        list={Object.entries(club.ranking).map(([key, value]) => ({
          key,
          image: { name: getIconName(key), color: theme.PrimaryColor },
          text: value.athlete
        }))}
      />
    );
  }
}
