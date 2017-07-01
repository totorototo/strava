import { get } from "lodash";

import { NotFoundEntity, isValid } from "../../../dataDefinitions/defects";

export const getEntity = (state, entityType, id) =>
  get(state, `entities.${entityType}.${id}`) === undefined
    ? NotFoundEntity
    : state.entities[entityType][id];

export const getEntities = (state, entityType, idList) =>
  idList.map(id => getEntities(state, entityType, id));

export const getValidEntities = (state, entityType, idList) =>
  getEntities(state, entityType, idList).filter(isValid);
