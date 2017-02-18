import { GET_ATHLETE_DETAILS } from '../constants/actionTypes';

export function getAthleteDetails(details) {
  return {
    type: GET_ATHLETE_DETAILS,
    details,
  };
}
