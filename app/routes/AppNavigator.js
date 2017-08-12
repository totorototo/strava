import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator } from "react-navigation";

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
    cardStyle: { flex: 1, marginTop: 0, backgroundColor: "#eff2f6" },
    headerMode: "none"
  }
);

const mapStateToProps = state => ({ state: state.appState.navigation });
const mapDispatchToProps = dispatch => ({ dispatch });
const mergeProps = (stateProps, dispatchProps) => ({
  navigation: addNavigationHelpers({
    state: stateProps.state,
    dispatch: dispatchProps.dispatch
  })
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  AppNavigator
);
