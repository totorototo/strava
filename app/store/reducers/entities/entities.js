import { combineReducers } from 'redux';

import athletes from './athletes';
import activities from './activities';
import entity from './entity';

export default combineReducers({
  athletes,
  activities,
  entity,
});
