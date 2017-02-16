// react
import React from 'react';

// redux
import { connect } from 'react-redux';

// react navigation
import { addNavigationHelpers } from 'react-navigation';

// routes
import { AppNavigator } from '../routes/index';

const AppWithNavigationState = connect(state => ({
  nav: state.nav,
}))(({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));

export default AppWithNavigationState;
