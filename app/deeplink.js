import { Linking, Platform } from "react-native";

// navigation
import { NavigationActions } from "react-navigation";

import parse from "url-parse";

export function subcribe(store) {
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
    console.error("An error occurred", err);
  });

  Linking.addEventListener("url", event => handleOpenURL(event.url));
}
