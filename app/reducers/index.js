import { combineReducers } from 'redux';

import login from './login';
import athlete from './athlete';
import navigation from './navigation';

export default combineReducers({
  navigation,
  login,
  athlete,
});
