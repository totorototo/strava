//constants
import {GET_ACCESS_TOKEN} from './../constants/actionTypes'

const initialState = {
    access_token: ''
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case GET_ACCESS_TOKEN:

            return Object.assign({}, state, {
                access_token: action.access_token
            });

        // ...other actions

        default:
            return state;
    }
}