import AppNavigator from '../../../routes/AppNavigator';

export default function reducer(state, action) {
  return AppNavigator.router.getStateForAction(action, state);
}
