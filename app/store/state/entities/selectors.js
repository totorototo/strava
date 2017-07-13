import { get } from "lodash";

import { NotFoundEntity, isValid } from "../../../dataDefinitions/defects";

export const bindState = mapStateToProps => (state, ...args) =>
  mapStateToProps.bind(state)(...args);

export const getEntity = (entityType, id) =>
  get(this, `entities.${entityType}.${id}`) === undefined
    ? NotFoundEntity
    : this.entities[entityType][id];

export const getValueFrom = (object, path) => {
  const value = get(object, path);
  return value === undefined ? NotFoundEntity : value;
};

export const getEntities = (entityType, idList = []) => {
  if (!Array.isArray(idList)) {
    console.warn("be carefull this is not an arry");
    return [];
  }
  return idList.map(id => getEntity(entityType, id)); // may be there is an issue here with this, if that the cas handle it
};

export const getValidEntities = (entityType, idList) =>
  getEntities(entityType, idList).filter(isValid);
