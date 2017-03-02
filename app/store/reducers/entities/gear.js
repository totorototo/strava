// constants
import { RETRIEVE_ATHLETE_GEAR } from '../../constants/actionTypes';

const initialState = {
  details: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ATHLETE_GEAR:

      return Object.assign({}, state, {
        details: action.details,
      });

    // ...other actions

    default:
      return state;
  }
}
