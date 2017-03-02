import { combineReducers } from 'redux';

import athlete from './athlete';
import activities from './activities';
import clubs from './clubs';
import gear from './gear';

export default combineReducers({
  athlete,
  activities,
  clubs,
  gear,
});
