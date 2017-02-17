import { combineReducers } from 'redux';

import login from './login';
import athlete from './athlete';
import { AppNavigator } from '../routes/index';

export default combineReducers({
  // TODO: hack. should import ans use navigation reducer instead.
  nav: (state, action) => (
     AppNavigator.router.getStateForAction(action, state)
  ),
  login,
  athlete,
});
