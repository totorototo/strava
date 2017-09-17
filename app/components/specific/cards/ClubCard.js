import React, { Component } from "react";
import PropTypes from "prop-types";

import Paragraph from "../../../components/typography/paragraph/Paragraph";
import Card from "../../common/card/Card";

export default class ClubCard extends Component {
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
      <Card title="LYBITOS" image={{ uri: club.cover_photo }}>
        <Paragraph>
          Please find below anything related to Lybitos club: leaks, gossips and
          much more!
        </Paragraph>
      </Card>
    );
  }
}
