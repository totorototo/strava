import { combineReducers } from "redux";

import login from "./login";
import navigation from "./navigation";
import data from "./data";

export default combineReducers({
  "@@/data": data,
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
