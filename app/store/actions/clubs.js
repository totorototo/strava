import { GET_ATHLETE_CLUBS, RETRIEVE_ATHLETE_CLUBS } from '../constants/actionTypes';

export function getAthleteClubs() {
  return {
    type: GET_ATHLETE_CLUBS,
  };
}

export function retrieveAthleteClubs(clubs) {
  return {
    type: RETRIEVE_ATHLETE_CLUBS,
    clubs,
  };
}
