import combineReducersTree from './combineReducersTree';

const data = {
  groceryManagement: {
    data: {
      groceries: {
        initialState: [],
        actions: ['ACTION1', 'ACTION2'],
        reducer: () => 'toto',
      },
    },
    container: {
      currentList: {
        initialState: null,
        actions: ['ACTION3', 'ACTION4'],
        reducer: () => 'toto',
      },
    },
  },
  listManagement: {
    data: {
      lists: {
        reducer: () => 'toto',
      },
    },
    container: {
      groceryListsEdit: {
        initialState: { list: null },
        actions: ['ACTION6'],
        reducer: () => 'toto',
      },
    },
  },
  common: {
    container: {
      application: {
        initialState: { isBusy: false },
        actions: ['ACTION7'],
        reducer: () => 'toto',
      },
      collapsableSidebar: {
        reducer: () => 'toto',
      },
    },
  },
};

test('It can register reducers without issue', () => {
  const a = combineReducersTree(data);
  expect(a({}, { type: 'salut' })).toMatchSnapshot();
  // todo shapeStore with redux init action
  // expect(reducerManager.scopeReducerMap).toMatchSnapshot();
});
