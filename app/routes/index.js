// React navigation
import { StackNavigator } from 'react-navigation';

import Login from './../components/login/Login';
import Home from './../components/home/Home';


export const AppNavigator = StackNavigator(
  {
    Login: { screen: Login },
    localhost: { screen: Home, path: 'localhost/*' },
  },
  {
    cardStyle: { flex: 1 },
  },
);
