import { RETRIEVE_ATHLETE_CLUBS } from '../constants/actionTypes';

export function retrieveAthleteClubs(list) {
  return {
    type: RETRIEVE_ATHLETE_CLUBS,
    list,
  };
}
