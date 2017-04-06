// constants
import {
  RETRIEVE_ATHLETE_DETAILS,
  RETRIEVE_ATHLETE_CLUBS,
  RETRIEVE_ATHLETE_GEAR,
  RETRIEVE_ATHLETE_STATS,
  SET_CURRENT_ATHLETE,
} from '../../constants/actionTypes';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ATHLETE_DETAILS:
      return {
        ...state,
        [action.athleteID]: {
          ...action.details,
        },
      };

    case RETRIEVE_ATHLETE_STATS:
      return {
        ...state,
        stats: action.stats,
      };

    case RETRIEVE_ATHLETE_CLUBS:
      return {
        ...state,
        [action.athleteID]: {
          ...state[action.athleteID], ...action.clubs,
        },
      };

    case RETRIEVE_ATHLETE_GEAR:
      return {
        ...state,
        ...action.gear,
      };

    case SET_CURRENT_ATHLETE:
      return {
        ...state,
        currentAthlete: action.athleteID,
      };

    // ...other actions

    default:
      return state;
  }
}
