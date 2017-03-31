// constants
import { GET_ATHLETE_DETAILS } from '../../constants/actionTypes';

const initialState = {
  details: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ATHLETE_DETAILS:

      return Object.assign({}, state, {
        details: action.details,
      });

        // ...other actions

    default:
      return state;
  }
}