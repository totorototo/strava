import { combineReducers } from 'redux';

import athletes from './athletes';
import activities from './activities';

export default combineReducers({
  athletes,
  activities,
});
