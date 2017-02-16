// React navigation
import { StackNavigator } from 'react-navigation';

import LoginContainer from './login/containers/LoginContainer';
import HomeContainer from './home/containers/HomeContainer';

export const AppNavigator = StackNavigator({
  Login: { screen: LoginContainer },
  localhost: { screen: HomeContainer },
});

