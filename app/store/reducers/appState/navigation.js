import AppNavigator from '../../../routes/AppNavigator';

export default function reducer(state, action) {
  if(action.routeName === 'Home' && !state.isAuthenticated) {
    return AppNavigator.router.getStateForAction({}, state);
  }
  return AppNavigator.router.getStateForAction(action, state);
}
