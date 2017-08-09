import {
  SET_CURRENT_USER_ID,
  SET_CURRENT_CLUB_ID,
  SET_CURRENT_RACE_ID
} from "../../constants/actionTypes";

const initialState = {
  currentUserID: "loading",
  currentClubID: "loading",
  currentRaceID: "Loading"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER_ID:
      return {
        ...state,
        currentUserID: action.currentUserID
      };

    case SET_CURRENT_CLUB_ID:
      return {
        ...state,
        currentClubID: action.currentClubID
      };

    case SET_CURRENT_RACE_ID:
      return {
        ...state,
        currentRaceID: action.currentRaceID
      };

    // ...other actions

    default:
      return state;
  }
}
