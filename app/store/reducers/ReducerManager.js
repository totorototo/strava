import { combineReducers } from 'redux';


export default class ReducerManager {
  scopeReducerMap = {}
  reducer = (action, state, ...args) => this.true_reducer(action, state, ...args);


  constructor() {
    Object.defineProperty(this, 'true_reducer', {
      enumerable: false,
      writable: true,
    });
  }

  addReducer(scopeReducerMap) {
    console.log(scopeReducerMap);
    this.true_reducer = combineReducers(scopeReducerMap);
    console.log(this.reducer({}, { type: 'a' }));
    for (const [scope, reducer] of Object.entries(scopeReducerMap)) {
      if (scope === undefined && typeof scope !== 'string' && scope.length === 0) {
        throw new Error('To register reducer you need to give a valid scope');
      }
//      if (typeof reducer !== 'function' ) {
      //       throw new Error('Expected the reducer to be a function.')
      //   }
      if (this.scopeReducerMap[scope] !== undefined) {
        console.log(`Replacing reducer at ${scope}`);
        this.scopeReducerMap[scope].replacedCount += 1;
      } else {
        this.scopeReducerMap[scope] = { replacedCount: 0 };
      }
      this.scopeReducerMap[scope].reducer = reducer;
    }
  }
}

