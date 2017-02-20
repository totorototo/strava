import { Linking, Platform } from 'react-native';

// navigation
import { NavigationActions } from 'react-navigation';


export function subcribe(store) {
  function handleOpenURL(url) {
    if (url != null && url.startsWith('strava://')) {
      const relativeUrl = url.substring(Platform.OS === 'android' ? 'strava://strava/'.length : 'strava;//'.length);
      store.dispatch(NavigationActions.navigate({ routeName: 'localhost', params: {state: '', code: '31305d0d2312fc4d95479f54c53b16ba486f84c9'} }));
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

