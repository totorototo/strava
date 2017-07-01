import { combineReducers } from "redux";

import login from "./login/login";
import navigation from "./navigation/navigation";
import data from "./data";

export default combineReducers({
  "@@/data": data,
  navigation,
  login
});
//
// const AppState = {
//   "@@/data": {
//     getCurrentUserID: 123
//   },
//   login: {
//     "@@/data": {},
//     header: {}
//   }
// };
