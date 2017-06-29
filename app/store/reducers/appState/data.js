import { SET_CURRENT_USER_ID } from "../../constants/actionTypes";

const initialState = {
  currentUserID: undefined
};

export default function reducer(state = initialState, action) {
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
}
