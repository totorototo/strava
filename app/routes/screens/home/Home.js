// react
import React, { Component, PropTypes } from "react";

// react-native
import { View, Text, Image } from "react-native";

// redux
import { connect } from "react-redux";

import styles from "./styles";

// styles
class Home extends Component {
  static propTypes = {
    athlete: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.lastname
    }).isRequired
  };

  render() {
    const { athlete } = this.props;

    return (
      <View style={styles.home}>
        <Image source={{ uri: athlete.profile }} style={styles.image} />
        {Object.keys(athlete).length > 0
          ? Object.keys(athlete).map(item => (
              <Text key={item}>{athlete[item]}</Text>
            ))
          : null}
      </View>
    );
  }
}

const getAthlete = (state, id) => state.entities.athletes[id];

const mapStateToProps = state => ({
  athlete: getAthlete(state, state.appState.currentUserID)
});

export default connect(mapStateToProps)(Home);
