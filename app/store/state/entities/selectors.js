/* @flow */
import { get } from "lodash";

import { NotFoundEntity, isValid } from "../../../dataDefinitions/defects";

export const getEntity = (state: StoreState, entityType: string, id: Id) =>
  get(state, `entities.${entityType}.${id}`) === undefined
    ? NotFoundEntity
    : state.entities[entityType][id];

export const getEntities = (
  state: StoreState,
  entityType: string,
  idList: Array<Id>
) => idList.map(id => getEntity(state, entityType, id));

export const getValidEntities = (
  state: StoreState,
  entityType: string,
  idList: Array<Id>
) => getEntities(state, entityType, idList).filter(isValid);
