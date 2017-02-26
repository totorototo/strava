import merge from 'lodash/merge';
import combineReducersTree from './combineReducersTree';

export default class ReducerManager {
  scopeReducerMap = {}
  reducer = (action, state) => this.trueReducer(action, state)
  reducersTreeArray = []
  trueReducer = (action, state) => state;

  addReducersTree(...trees) {
    this.reducersTreeArray = this.reducersTreeArray.concat(trees);
    this.trueReducer = combineReducersTree(merge({}, ...this.reducersTreeArray));
  }
}

