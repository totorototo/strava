import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export default StyleSheet.create({
  overlay: {
    height: 130,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: theme.PaperColor,
    opacity: 0.6,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "stretch",
    paddingVertical: 5
  }
});
