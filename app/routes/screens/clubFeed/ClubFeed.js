import React, { Component } from "react";

import { View, Text } from "react-native";

import styles from "./styles";

// styles
class ClubFeed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Lybitos club gossips and more</Text>
      </View>
    );
  }
}

export default ClubFeed;
