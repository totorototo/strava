import { StyleSheet } from "react-native";

import theme from "../../../../theme/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  details: {
    marginTop: 30
  },
  text: {
    color: theme.BackgroundColorText,
    fontSize: 15
  }
});
