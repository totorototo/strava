import { AppNavigator } from '../routes/index';

export default function reducer(state, action) {
  return AppNavigator.router.getStateForAction(action, state);
}
