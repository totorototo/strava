import { combineReducers } from 'redux';

import athlete from './athlete';
import activities from './activities';
import clubs from './clubs';
import gears from './gears';

export default combineReducers({
  athlete,
  activities,
  clubs,
  gears,
});
