import React from "react";
import { View } from "react-native";

import Title from "../../components/typography/title/Title";

const Authenticate = () =>
  <View>
    <Title>Authenticate</Title>
  </View>;

Authenticate.navigationOptions = {
  title: "Authenticate"
};

export default Authenticate;
