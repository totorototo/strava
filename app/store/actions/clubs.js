import { GET_ATHLETE_CLUBS, RETRIEVE_ATHLETE_CLUBS } from '../constants/actionTypes';

export function getAthleteClubs() {
  return {
    type: GET_ATHLETE_CLUBS,
  };
}

export function retrieveAthleteClubs(list) {
  return {
    type: RETRIEVE_ATHLETE_CLUBS,
    list,
  };
}
