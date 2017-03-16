import { RETRIEVE_ENTITY } from '../constants/actionTypes';

export function retrieveEntity(entity) {
  return {
    type: RETRIEVE_ENTITY,
    entity,
  };
}
