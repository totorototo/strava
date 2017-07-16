import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  scroll: {
    marginTop: 20,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  members: {
    flex: 1,
    flexDirection: "row",
    alignContent: "flex-start"
  },
  image: {
    width: 20,
    height: 20
  },
  text: {
    color: "#FC4C02",
    marginBottom: 10,
    marginLeft: 10
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  card: {
    color: "#FC4C02"
  }
});
