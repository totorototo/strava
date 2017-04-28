// react
import React, { Component, PropTypes } from "react";
// redux
import { connect } from "react-redux";
// react navigation
import { addNavigationHelpers } from "react-navigation";
// routes
import AppNavigator from "./AppNavigator";

class AppWithNavigationState extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    state: PropTypes.shape({
      index: PropTypes.number,
      routes: PropTypes.array
    }).isRequired
  };

  render() {
    const { dispatch, state } = this.props;
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state })} />
    );
  }
}

const mapStateToProps = state => ({ state: state.appState.navigation });

export default connect(mapStateToProps)(AppWithNavigationState);
