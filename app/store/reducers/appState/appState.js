import { combineReducers } from "redux";

import login from "./login";
import navigation from "./navigation";

import { SET_CURRENT_USER_ID } from "../../constants/actionTypes";

export default combineReducers({
  "@@/data": (state = {}, action) => {
    switch (action.type) {
      case SET_CURRENT_USER_ID:
        return {
          ...state,
          currentUserID: action.currentUserID
        };
      // ...other actions
      default:
        return state;
    }
  },
  navigation,
  login
});
//
// const AppState = {
//   "@@/data": {
//     currentUserID: 123
//   },
//   login: {
//     "@@/data": {},
//     header: {}
//   }
// };
