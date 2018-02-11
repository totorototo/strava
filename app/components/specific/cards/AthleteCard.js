import React, { Component } from "react";
import PropTypes from "prop-types";

import Paragraph from "../../../components/typography/paragraph/Paragraph";
import Card from "../../common/card/Card";

export default class AthleteCard extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profile: PropTypes.string
    }).isRequired
  };

  render() {
    const { athlete } = this.props;
    return (
      <Card
        title="ATHLETE"
        image={{
          uri:
            "https://blog.strava.com/wp-content/uploads/2017/12/Strava_YearInStats_Header_0_1x-1.jpg"
        }}
      >
        <Paragraph>
          Anything you need to know about {athlete.firstname} {athlete.lastname}.
          performance, data, predictions and much more!
        </Paragraph>
      </Card>
    );
  }
}
