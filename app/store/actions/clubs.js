import { RETRIEVE_ATHLETE_CLUBS } from '../constants/actionTypes';

export function retrieveAthleteClubs(clubs) {
  return {
    type: RETRIEVE_ATHLETE_CLUBS,
    clubs,
  };
}
