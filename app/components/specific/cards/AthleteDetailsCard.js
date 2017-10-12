import React, { Component } from "react";
import PropTypes from "prop-types";

import CardList from "../../common/cardList/CardList";
import { getIconName } from "../../../routes/main/clubFeed/helper";
import theme from "../../../theme/theme";

export default class AthleteDetailsCard extends Component {
  // ToDO fix shape
  static propTypes = {
    rendered: PropTypes.bool,
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profil: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    rendered: true
  };

  render() {
    const { athlete } = this.props;
    if (!this.props.rendered) return false;

    return (
      <CardList
        title="DETAILS"
        list={athlete.performance.details.map((detail, index) => ({
          key: index,
          image: {
            name: getIconName(detail.name),
            color: theme.PrimaryColor
          },
          text: `${detail.value}  ${detail.unit !== undefined
            ? detail.unit
            : ""}`
        }))}
      />
    );
  }
}
