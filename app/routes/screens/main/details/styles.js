import { StyleSheet } from "react-native";

import theme from "../../../../theme/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  athleteImageStyle: {
    padding: 0,
    margin: 0,
    borderWidth: 0
  },
  text: {
    color: theme.paperColorText,
    marginBottom: 10,
    marginLeft: 10
  },
  card: {
    color: theme.paperColorText
  },
  scroll: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  }
});
