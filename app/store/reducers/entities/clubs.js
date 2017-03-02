// constants
import { RETRIEVE_ATHLETE_CLUBS } from '../../constants/actionTypes';

const initialState = {
  list: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ATHLETE_CLUBS:

      return Object.assign({}, state, {
        list: action.list,
      });

    // ...other actions

    default:
      return state;
  }
}
