import { SET_ENTITIES, UPDATE_ENTITIES } from "../constants/actionTypes";

export function setEntities(entities) {
  return {
    type: SET_ENTITIES,
    entities
  };
}

export function updateEntities(id, entityType, payload) {
  return {
    type: UPDATE_ENTITIES,
    id,
    entityType,
    payload
  };
}
