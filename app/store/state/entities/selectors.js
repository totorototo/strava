import { NotFoundEntity, isValid } from "../../../dataDefinitions/defects";

export const getEntity = (state, entityType, id) =>
  state[entityType][id] === undefined ? NotFoundEntity : state[entityType][id];

export const getEntities = (state, entityType, idList) =>
  idList.map(id => getEntities(state, entityType, id));

export const getValidEntities = (state, entityType, idList) =>
  getEntities(state, entityType, idList).filter(isValid);
