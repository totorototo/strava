// constants
import { RETRIEVE_ATHLETE_GEAR } from '../../constants/actionTypes';

const initialState = {
  gear: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ATHLETE_GEAR:

      return Object.assign({}, state, {
        gear: action.gear,
      });

    // ...other actions

    default:
      return state;
  }
}
