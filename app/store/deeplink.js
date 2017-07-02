import { Linking, Platform } from "react-native";

import { NavigationActions } from "react-navigation";

import parse from "url-parse";

export default function deeplink(store) {
  function handleOpenURL(url) {
    if (url !== null && url.startsWith("strava://")) {
      const relativeUrl = url.substring(
        Platform.OS === "android" ? "strava://".length : "strava;//".length
      );
      const parsedUrl = parse(relativeUrl, true);
      if (parsedUrl.query) {
        store.dispatch(
          NavigationActions.navigate({
            routeName: "Home",
            params: parsedUrl.query
          })
        );
      }
    }
  }

  Linking.getInitialURL().then(url => handleOpenURL(url)).catch(err => {
    // eslint no-console: "error"
    console.error("An error with deep linking occurred ", err);
  });

  Linking.addEventListener("url", event => handleOpenURL(event.url));
}
