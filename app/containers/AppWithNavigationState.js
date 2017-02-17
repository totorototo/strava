// react
import React from 'react';

// redux
import { connect } from 'react-redux';

// react navigation
import { addNavigationHelpers } from 'react-navigation';

// routes
import { AppNavigator } from '../routes/index';

const AppWithNavigationState = connect(state => ({
  navigation: state.navigation,
}))(({ dispatch, navigation }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: navigation })} />
));

export default AppWithNavigationState;
