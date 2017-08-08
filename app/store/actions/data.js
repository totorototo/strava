import {
  SET_CURRENT_USER_ID,
  SET_CURRENT_CLUB_ID,
  SET_CURRENT_RACE_ID
} from "../constants/actionTypes";

export function setCurrentUserID(currentUserID) {
  return {
    type: SET_CURRENT_USER_ID,
    currentUserID
  };
}

export function setCurrentClubID(currentClubID) {
  return {
    type: SET_CURRENT_CLUB_ID,
    currentClubID
  };
}

export function setCurrentRaceID(currentRaceID) {
  return {
    type: SET_CURRENT_RACE_ID,
    currentRaceID
  };
}
