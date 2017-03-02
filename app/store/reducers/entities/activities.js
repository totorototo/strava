// constants
import { RETRIEVE_ATHLETE_ACTIVITIES } from '../../constants/actionTypes';

const initialState = {
  activities: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ATHLETE_ACTIVITIES:

      return Object.assign({}, state, {
        activities: action.activities,
      });

    // ...other actions

    default:
      return state;
  }
}
