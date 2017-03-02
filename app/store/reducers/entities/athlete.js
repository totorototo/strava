// constants
import { RETRIEVE_ATHLETE_DETAILS } from '../../constants/actionTypes';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ATHLETE_DETAILS:

      return Object.assign({}, state,
        action.details,
      );

    // ...other actions

    default:
      return state;
  }
}
