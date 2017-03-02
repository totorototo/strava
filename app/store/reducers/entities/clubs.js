// constants
import { RETRIEVE_ATHLETE_CLUBS } from '../../constants/actionTypes';

const initialState = {
  clubs: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ATHLETE_CLUBS:

      return Object.assign({}, state, {
        clubs: action.clubs,
      });

    // ...other actions

    default:
      return state;
  }
}
