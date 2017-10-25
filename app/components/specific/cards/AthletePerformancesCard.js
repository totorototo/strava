import React, { Component } from "react";
import PropTypes from "prop-types";

import CardList from "../../common/cardList/CardList";
import { getIconName } from "../../../routes/main/clubFeed/helper";
import theme from "../../../theme/theme";

export default class AthletePerformancesCard extends Component {
  static propTypes = {
    rendered: PropTypes.bool,
    performances: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        percent: PropTypes.number,
        value: PropTypes.number,
        unit: PropTypes.string
      })
    ).isRequired
  };

  static defaultProps = {
    rendered: true
  };

  render() {
    const { performances } = this.props;
    if (!this.props.rendered) return false;

    const performancesList = performances.map((performance, index) => ({
      key: index,
      image: {
        name: getIconName(performance.name),
        color: theme.PrimaryColor
      },
      text: `${performance.value}  ${performance.unit !== undefined
        ? performance.unit
        : ""}`
    }));

    return <CardList title="DETAILS" list={performancesList} />;
  }
}
