// constants
import {
  RETRIEVE_ATHLETE_DETAILS,
  RETRIEVE_ATHLETE_CLUBS,
  RETRIEVE_ATHLETE_GEAR,
  RETRIEVE_ATHLETE_STATS,
} from '../../constants/actionTypes';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ATHLETE_DETAILS:
      return {
        ...state,
        ...action.details,
      };

    case RETRIEVE_ATHLETE_STATS:
      return {
        ...state,
        stats: action.stats,
      };

    case RETRIEVE_ATHLETE_CLUBS:
      return {
        ...state,
        clubs: action.clubs,
      };

    case RETRIEVE_ATHLETE_GEAR:
      return {
        ...state,
        ...action.gear,
      };

    // ...other actions

    default:
      return state;
  }
}
