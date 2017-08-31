import { StyleSheet } from "react-native";

import theme from "../../theme/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    // todo check if it always valid color
    color: theme.paperColorText,
    textAlign: "center",
    fontSize: 40
  }
});
