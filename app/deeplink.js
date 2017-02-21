import { Linking, Platform } from 'react-native';

// navigation
import { NavigationActions } from 'react-navigation';


export function subcribe(store) {
  function handleOpenURL(url) {
    if (url != null && url.startsWith('strava://')) {
      const relativeUrl = url.substring(Platform.OS === 'android' ? 'strava://strava/'.length : 'strava;//'.length);
      const tokenRegexp = /(?:&code=)(\w*)/g;
      const tokenMatch = tokenRegexp.exec(relativeUrl);
      if (tokenMatch && tokenMatch.length > 1) {
        store.dispatch(NavigationActions.navigate({
          routeName: 'Home',
          params: { state: '', code: tokenMatch[1] },
        }));
      }
    }
  }

  Linking.getInitialURL()
    .then(handleOpenURL)
    .catch((err) => {
      // eslint no-console: "error"
      console.error('An error occurred', err);
    });

  Linking.addEventListener('url', event => handleOpenURL(event.url));
}

