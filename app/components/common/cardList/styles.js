import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export default StyleSheet.create({
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
  card: {
    color: theme.PrimaryTextColor
  },
  item: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 20
  }
});
