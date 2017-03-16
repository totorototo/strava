// constants
import { RETRIEVE_ENTITY } from '../../constants/actionTypes';

const initialState = {};

// TODO: to be correctly implemented.
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ENTITY:
      return {
        ...state,
        ...action.entity,
      };

      // ...other actions

    default:
      return state;
  }
}
