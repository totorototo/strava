// constants
import { RETRIEVE_ACCESS_TOKEN } from '../../constants/actionTypes';

const initialState = {
  accessToken: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_ACCESS_TOKEN:

      return Object.assign({}, state, {
        accessToken: action.accessToken,
      });

        // ...other actions

    default:
      return state;
  }
}
