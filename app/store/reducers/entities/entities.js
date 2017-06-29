// constants
import { SET_ENTITIES, UPDATE_ENTITY } from "../../constants/actionTypes";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ENTITIES:
      return {
        ...state,
        ...action.entities
      };
    case UPDATE_ENTITY:
      return {
        ...state,
        [action.entityType]: {
          ...state[action.entityType],
          [action.id]: {
            ...state[action.entityType][action.id],
            ...action.payload
          }
        }
      };

    // ...other actions

    default:
      return state;
  }
}
