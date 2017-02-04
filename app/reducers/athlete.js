//constants
import * as types from './../constants/actionTypes'

const initialState = {
    athlete: {}
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case types.GET_ATHLETE_DETAILS:

            return Object.assign({}, state, {
                athlete: action.details
            });

        // ...other actions

        default:
            return state;
    }
}