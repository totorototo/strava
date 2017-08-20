import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";

import {
  isFaulty,
  getDefect,
  IsLoading
} from "../../../../dataDefinitions/defects";
import selector from "./selector";
import styles from "./styles";
import Loading from "../../../../components/loading/Loading";
import Faulty from "../../../../components/faulty/Faulty";

class Details extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profil: PropTypes.string
    }).isRequired
  };

  render() {
    const { athlete } = this.props;
    if (athlete === IsLoading) return <Loading />;

    if (isFaulty(athlete)) return <Faulty message={getDefect(athlete)} />;

    return (
      <View style={styles.container}>
        <Image source={{ uri: athlete.profile }} style={styles.image} />
        <Text style={styles.text}>
          {athlete.firstname}
        </Text>
        <Text style={styles.text}>
          {athlete.lastname}
        </Text>
      </View>
    );
  }
}

export default connect(selector)(Details);
