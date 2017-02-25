import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import set from 'lodash/set';

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


export default function combineReducersTree(tree) {
  const reversedTree = {
    // action1: { scope1: reducer, scope2: reducer },
    '*': {},
  };

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
                  set(reversedTree[action], scope, subTree.reducer);
                },
              );
            } else {
              set(reversedTree['*'], scope, subTree.reducer);
            }
          } else if (isValidNode(subTree)) {
            reverseTree(node, scope.length === 0 ? key : `${scope}.${key}`);
          }
        },
      );
  }

  reverseTree(tree);
  // return reversedTree;
  function recursiveProcess(state = {}, action, task) {
    if (typeof task === 'function') {
      console.log('did task');
      return task(state, action);
    } else if (!isPlainObject(task)) {
      // reversedTree (task) must contain only plain object and reducer
      console.warn(`unhandled action ${action.type}`);
      return state;
    }
    return Object.entries(task)
      .reduce(
        (accu, [key, subtask]) => {
          accu[key] = recursiveProcess(
            state[key],
            action,
            subtask,
          );
          return accu;
        }
        , {},
      );
  }

  return (state, action) => recursiveProcess(
    state,
    action,
    { ...reversedTree[action], ...reversedTree['*'] },
  );
}
