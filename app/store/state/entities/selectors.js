import { get } from "lodash";

import { NotFoundEntity, isValid } from "../../../dataDefinitions/defects";

export const getEntity = (state, entityType, id) =>
  get(state, `entities.${entityType}.${id}`) === undefined
    ? NotFoundEntity
    : state.entities[entityType][id];

export const getEntityValue = (state, entityType, id, key) =>
  get(state, `entities.${entityType}.${id}.${key}`) === undefined
    ? NotFoundEntity
    : state.entities[entityType][id][key];

export const getEntities = (state, entityType, idList) =>
  idList.map(id => getEntity(state, entityType, id));

export const getValidEntities = (state, entityType, idList) =>
  getEntities(state, entityType, idList).filter(isValid);
