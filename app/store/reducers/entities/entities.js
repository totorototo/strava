// constants
import { SET_ENTITIES } from '../../constants/actionTypes';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ENTITIES:
      return {
        ...state,
        ...action.entities,
      };

    // ...other actions

    default:
      return state;
  }
}
