// constants
import { RETRIEVE_ATHLETE_ACTIVITIES } from '../../constants/actionTypes';

const initialState = {
  list: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ATHLETE_ACTIVITIES:

      return Object.assign({}, state, {
        list: action.list,
      });

    // ...other actions

    default:
      return state;
  }
}
