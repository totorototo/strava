import { get } from "lodash";

import {
  Loading,
  NotFoundEntity,
  isValid
} from "../../../dataDefinitions/defects";

export const getEntity = (state, entityType, id) => {
  if (id === "loading") return Loading;
  return get(state, `entities.${entityType}.${id}`) === undefined
    ? NotFoundEntity
    : state.entities[entityType][id];
};

export const getValueFrom = (object, path) => {
  const value = get(object, path);
  return value === undefined ? NotFoundEntity : value;
};

export const getEntities = (state, entityType, idList = []) => {
  if (!Array.isArray(idList)) {
    return [];
  }
  return idList.map(id => getEntity(state, entityType, id)); // may be there is an issue here with this, if that the cas handle it
};

export const getValidEntities = (state, entityType, idList) =>
  getEntities(state, entityType, idList).filter(isValid);
