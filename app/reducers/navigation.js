import { AppNavigator } from '../routes/index';

const initialState = {};

export default function reducer(state = initialState, action) {
  // return {
  //  nav: (state, action) => (
  AppNavigator.router.getStateForAction(action, state);
  //    ),
  // };
}
