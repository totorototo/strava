// react
import React, { Component, PropTypes } from "react";

// react-native
import { View, Text, Image } from "react-native";

// redux
import { connect } from "react-redux";

import styles from "./styles";

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

    return (
      <View style={styles.home}>
        <Image source={{ uri: athlete.profile }} style={styles.image} />
        <Text>
          {athlete.firstname}
        </Text>
        <Text>
          {athlete.lastname}
        </Text>
      </View>
    );
  }
}

const getAthlete = (state, id) => {
  if (id !== undefined && state.entities.athletes) {
    return state.entities.athletes[id];
  }
  return { firstname: "", lastname: "", profile: "" };
};

const mapStateToProps = state => ({
  athlete: getAthlete(state, state.appState["@@/data"].currentUserID)
});

export default connect(mapStateToProps)(Details);
