import {
  SET_ENTITIES,
  SET_ENTITY,
  UPDATE_ENTITY
} from "../constants/actionTypes";

export function setEntities(entities) {
  return {
    type: SET_ENTITIES,
    entities
  };
}

export function setEntity(entityType, payload) {
  return {
    type: SET_ENTITY,
    entityType,
    payload
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
