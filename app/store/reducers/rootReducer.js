import { combineReducers } from 'redux';

import appState from './appState/appState';
import entities from './entities/entities';
// import screensState from './screensState/screensState';

export default combineReducers({
  appState,
  entities,
  // screensState,
});
