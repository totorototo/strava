import { SET_CURRENT_USER_ID } from "../constants/actionTypes";

export function setCurrentUserID(currentUserID) {
  return {
    type: SET_CURRENT_USER_ID,
    currentUserID
  };
}
