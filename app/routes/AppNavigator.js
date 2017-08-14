import { compose } from "redux";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator } from "react-navigation";
import Config from "react-native-config";

import deeplink from "../hocs/deeplink";
import Login from "./screens/login/Login";
import Main from "./screens/main/Main";

const { URL_SHEME_PREFIX, URL_SHEME_HOST } = Config;

const navigatorOptions = {
  cardStyle: { flex: 1, marginTop: 0, backgroundColor: "#eff2f6" },
  headerMode: "none"
};

const AppNavigator = StackNavigator(
  {
    Login: {
      screen: Login,
      path: "login"
    },
    Main: {
      screen: Main,
      path: "main"
    }
  },
  navigatorOptions
);

const mapStateToProps = state => ({ state: state.appState.navigation });
const mapDispatchToProps = dispatch => ({ dispatch });
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  navigation: addNavigationHelpers({
    state: stateProps.state,
    dispatch: dispatchProps.dispatch
  })
});

const connectWithDeepLink = compose(
  deeplink(`${URL_SHEME_PREFIX}://${URL_SHEME_HOST}/`),
  connect(mapStateToProps, mapDispatchToProps, mergeProps)
);

export default connectWithDeepLink(AppNavigator);
