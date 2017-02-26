import combineReducersTree from './combineReducersTree';

const data = {
  groceryManagement: {
    data: {
      groceries: {
        actions: ['ACTION1'],
        reducer: (state, action) => action.data,
      },
    },
    container: {
      currentList: {
        actions: ['ACTION3', 'ACTION4'],
        reducer: (state, action) => action.data,
      },
    },
  },
  listManagement: {
    data: {
      lists: {
        reducer: (state, action) => action.data,
      },
    },
    container: {
      groceryListsEdit: {
        actions: ['ACTION6'],
        reducer: (state, action) => action.data,
      },
    },
  },
  common: {
    container: {
      application: {
        actions: ['ACTION7'],
        reducer: (state, action) => action.data,
      },
      collapsableSidebar: {
        reducer: (state, action) => action.data,
      },
    },
  },
};

const initialState = {
  groceryManagement: {
    data: {
      groceries: 'some data at start',
    },
  },
  basket: "a basket that shouldn't be touched",
  building: {
    appartment1: 'it s my home must not touch it',
  },
};

describe('combineReducerTree', () => {
  it('It can init state with init action', () => {
    const a = combineReducersTree(data);
    expect(a({}, { type: '@@redux/INIT' })).toMatchSnapshot();
    // todo shapeStore with redux init action
    // expect(reducerManager.scopeReducerMap).toMatchSnapshot();
  });

  it('It can dispatch a scpecific action', () => {
    const a = combineReducersTree(data);
    expect(a({}, { type: 'ACTION1', data: 'some data after ACTION1' })).toMatchSnapshot();
    // todo shapeStore with redux init action
    // expect(reducerManager.scopeReducerMap).toMatchSnapshot();
  });

  it('It can dispatch a scpecific action with a previous state', () => {
    const a = combineReducersTree(data);
    expect(a(initialState, { type: 'ACTION1', data: 'some data after ACTION1' })).toMatchSnapshot();
    // todo shapeStore with redux init action
    // expect(reducerManager.scopeReducerMap).toMatchSnapshot();
  });

  it('Previous state is not alterated by action and immutability principle are respected', () => {
    const a = combineReducersTree(data);
    const initialStateBefore = JSON.stringify(initialState);
    const newState = a(initialState, { type: 'ACTION1', data: 'some data after ACTION1' });
    const initialStateAfter = JSON.stringify(initialState);
    expect(initialStateBefore).toBe(initialStateAfter);
    expect(initialState).not.toBe(newState);
    expect(initialState.building.appartment1).toBe(newState.building.appartment1);
    expect(initialState.building.appartment1).toBe(newState.building.appartment1);
    expect(newState).toMatchSnapshot();
    expect(initialState.groceryManagement.data.groceries).not.toBe(newState.groceryManagement.data.groceries);
    expect(initialState.groceryManagement).not.toBe(newState.groceryManagement);
    expect(initialState.basket).toBe(newState.basket);
  });
});
