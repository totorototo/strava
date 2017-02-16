// react
import { Platform } from 'react-native';

// React navigation
import { StackNavigator } from 'react-navigation';

import LoginContainer from './login/containers/LoginContainer';
import HomeContainer from './home/containers/HomeContainer';

export const AppNavigator = StackNavigator({
  Login: { screen: LoginContainer },
  localhost: { screen: HomeContainer, path: 'localhost/*',
  },
}, {
  containerOptions: {
    // on Android, the URI prefix typically contains a host in addition to scheme
    URIPrefix: Platform.OS === 'android' ? 'strava://strava/' : 'strava://',
  },
});

