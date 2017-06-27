// react
import React, { Component } from "react";

// react-native
import { View, Text } from "react-native";

import styles from "./styles";

// styles
class ClubFeed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Lybitos club gossips and more</Text>
      </View>
    );
  }
}

export default ClubFeed;
