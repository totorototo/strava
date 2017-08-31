import { StyleSheet } from "react-native";

import theme from "../../../../theme/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 50,
    height: 50
  },
  text: {
    color: theme.backgroundColorText
  }
});
