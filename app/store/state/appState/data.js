import {
  SET_CURRENT_USER_ID,
  SET_CURRENT_CLUB_ID
} from "../../constants/actionTypes";

const initialState = {
  currentUserID: 0
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

    // ...other actions

    default:
      return state;
  }
}
