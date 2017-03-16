import { combineReducers } from 'redux';

import athlete from './athlete';
import activities from './activities';
import entity from './entity';

export default combineReducers({
  athlete,
  activities,
  entity,
});
