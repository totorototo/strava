import * as types from "../constants/actionTypes";

export function getAthleteDetails(details) {
    return {
        type: types.GET_ATHLETE_DETAILS,
        details
    }
}