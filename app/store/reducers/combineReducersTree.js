/* eslint no-param-reassign: "off" */
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import set from 'lodash/set';
import merge from 'lodash/merge';

function isValidNode(node) {
  return isPlainObject(node);
}

function isActionsArray(actions) {
  return actions === undefined ||
    (
      isArray(actions) &&
      actions.reduce((accu, action) => accu && typeof action === 'string', true)
    );
}

function isLeaf(node) {
  return node && typeof node === 'object' && isActionsArray(node.actions) && typeof node.reducer === 'function';
}


export default function combineReducersTree(tree, initAction = { type: '@@redux/INIT' }) {
  const reversedTree = {
    // action1: { scope1: reducer, scope2: reducer },
    '*': {},
  };

  let hasBeenInitialized = false;

  function reverseTree(subTree, scope = '') {
    Object.entries(subTree)
      .forEach(
        ([key, node]) => {
          if (isLeaf(subTree)) {
            if (subTree.actions) {
              subTree.actions.forEach(
                (action) => {
                  if (reversedTree[action] === undefined) {
                    reversedTree[action] = {};
                  }
                  set(reversedTree[action], scope, subTree);
                },
              );
            } else {
              set(reversedTree['*'], scope, subTree);
            }
          } else if (isValidNode(subTree)) {
            reverseTree(node, scope.length === 0 ? key : `${scope}.${key}`);
          }
        },
      );
  }

  reverseTree(tree);
  // return reversedTree;
  function recursiveProcess(state, action, task) {
    const isInit = initAction.type === action.type;
    if (isLeaf(task)) {
      const newState = task.reducer(state, action);
      return { value: newState, hasChanged: newState !== state };
    } else if (!isPlainObject(task)) {
      // reversedTree (task) must contain only plain object and reducer
      throw new Error('unexpected');
    }
    const resultValue = Object.entries(task).reduce(
      (accu, [key, subtask]) => {
        const temp = recursiveProcess(
          isPlainObject(state) ? state[key] : {},
          action,
          subtask,
          isInit,
        );
        accu.value[key] = temp.value;
        accu.hasChanged = accu.hasChanged ||
          temp.hasChanged;
        return accu;
      }
      , { value: { ...state }, hasChanged: false },
    );
    return {
      ...resultValue,
      hasChanged: resultValue.hasChanged || resultValue.value !== state,
    };
  }

// todo optmization no avoid merge on each action
  return (state, action) => {
    let temp = { value: state, hasChanged: false };
    if (!hasBeenInitialized || initAction.type === action.type) {
      temp = recursiveProcess(
        state,
        initAction,
        tree,
      );
      hasBeenInitialized = true;
    }
    temp = recursiveProcess(
      temp.value,
      action,
      merge({}, reversedTree[action.type], reversedTree['*']),
    );
    return temp.hasChanged ? temp.value : state;
  };
}
