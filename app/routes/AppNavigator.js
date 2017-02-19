// React navigation
import { StackNavigator } from 'react-navigation';
import Login from './screens/login/Login';
import Home from './screens/home/Home';

const AppNavigator = StackNavigator(
  {
    Login: { screen: Login },
    localhost: { screen: Home, path: 'localhost/*' },
  },
  { cardStyle: { flex: 1 } },
);

export default AppNavigator;
