import { SET_ENTITIES, UPDATE_ENTITY } from "../constants/actionTypes";

export function setEntities(entities) {
  return {
    type: SET_ENTITIES,
    entities
  };
}

export function updateEntity(id, entityType, payload) {
  return {
    type: UPDATE_ENTITY,
    id,
    entityType,
    payload
  };
}
