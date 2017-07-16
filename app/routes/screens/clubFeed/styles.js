import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 2
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
    alignItems: "center"
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
