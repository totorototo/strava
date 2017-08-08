import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    padding: 0,
    marginTop: 15
  },
  scroll: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  image: {
    flex: 1,
    height: 150
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "black",
    opacity: 0.4
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    color: "#FC4C02",
    marginBottom: 10,
    marginLeft: 10
  }
});
