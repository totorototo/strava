import { SET_ENTITIES } from "../constants/actionTypes";

export function setEntities(entities) {
  return {
    type: SET_ENTITIES,
    entities
  };
}
