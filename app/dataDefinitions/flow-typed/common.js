declare module "lodash" {
  // This is where we'll list the module's exported interface(s)
  declare function get(object: {}, string: string): any;
}

type Id = string;

type Athlete = {
  id: Id,
  firstName: string,
  lastName: string,
  favoriteStadiums: Array<Id>
};

type Statdium = {
  id: Id,
  name: string
};

type Entity = Athlete | any;

type EntityName = "athlete" | string;

type EntitiesList<T: Entity> = {
  [Id]: ?T
};

type StoreState = {
  entities: {
    [EntityName]: EntitiesList<Entity>
  },
  appState: any,
  screenState: any
};
