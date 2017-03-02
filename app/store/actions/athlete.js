import { RETRIEVE_ATHLETE_DETAILS } from '../constants/actionTypes';

export function retrieveAthleteDetails(details) {
  return {
    type: RETRIEVE_ATHLETE_DETAILS,
    details,
  };
}
