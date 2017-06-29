// constants
import { SET_ENTITIES, UPDATE_ENTITIES } from "../../constants/actionTypes";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ENTITIES:
      return {
        ...state,
        ...action.entities
      };
    case UPDATE_ENTITIES:
      return Object.keys(state[action.entityType]).map(item => {
        if (parseInt(item, 10) === action.id) {
          return {
            ...state,
            [action.entityType]: {
              [action.id]: {
                ...state[action.entityType][action.id],
                ...action.payload
              }
            }
          };
        }
        return state;
      });

    // ...other actions

    default:
      return state;
  }
}
