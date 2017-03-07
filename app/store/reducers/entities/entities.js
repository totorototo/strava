import { combineReducers } from 'redux';

import athlete from './athlete';
import activities from './activities';

export default combineReducers({
  athlete,
  activities,
});
