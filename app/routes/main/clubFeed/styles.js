import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  clubImageStyle: {
    padding: 0,
    margin: 0,
    borderWidth: 0
  },
  containerCardStyle: {
    padding: 15,
    marginTop: 15,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 0
  },
  dividerStyle: {
    marginLeft: 0,
    marginRight: 0
  },
  scroll: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  members: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  image: {
    width: 20,
    height: 20
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  card: {
    color: theme.PrimaryTextColor
  }
});
