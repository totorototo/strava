import { StackNavigator } from "react-navigation";

import Login from "./screens/login/Login";
import Home from "./screens/home/Home";

import Authenticate from "./screens/authenticate/authenticate";

const AppNavigator = StackNavigator(
  {
    Login: { screen: Login },
    Authenticate: { screen: Authenticate, path: "localhost" },
    Home: { screen: Home }
  },
  {
    cardStyle: { flex: 1 },
    headerMode: "none"
  }
);

export default AppNavigator;
