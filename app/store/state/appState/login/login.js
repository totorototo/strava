import { SET_ACCESS_TOKEN } from "../../../constants/actionTypes";

const initialState = {
  accessToken: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken
      };

    // ...other actions

    default:
      return state;
  }
}
