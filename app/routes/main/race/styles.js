import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  defectContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  overlay: {
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
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    color: theme.BackgroundTextColor,
    textAlign: "center"
  },
  bubble: {
    // todo handle transparency theme
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 100,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  buttonText: {
    textAlign: "center",
    color: theme.PaperTextColor
  }
});
