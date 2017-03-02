// constants
import { RETRIEVE_ATHLETE_GEAR } from '../../constants/actionTypes';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ATHLETE_GEAR:

      return Object.assign({}, state,
        action.gear,
      );

    // ...other actions

    default:
      return state;
  }
}
