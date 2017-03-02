// constants
import { GET_ACCESS_TOKEN } from '../../constants/actionTypes';

const initialState = {
  accessToken: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACCESS_TOKEN:

      return Object.assign({}, state, {
        accessToken: action.accessToken,
      });

        // ...other actions

    default:
      return state;
  }
}
