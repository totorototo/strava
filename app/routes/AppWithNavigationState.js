import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { addNavigationHelpers } from "react-navigation";

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
