import { combineReducers } from 'redux';

import routes from './routes'
import login from './login'
import athlete from './athlete'

export default combineReducers({
    routes,
    login,
    athlete
});