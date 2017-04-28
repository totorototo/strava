import { combineReducers } from "redux";

import login from "./login";
import navigation from "./navigation";

export default combineReducers({
  navigation,
  login
});
