import { GET_ATHLETE_ACTIVITIES, RETRIEVE_ATHLETE_ACTIVITIES } from '../constants/actionTypes';

export function getAthleteActivities() {
  return {
    type: GET_ATHLETE_ACTIVITIES,
  };
}

export function retrieveAthleteActivities(list) {
  return {
    type: RETRIEVE_ATHLETE_ACTIVITIES,
    list,
  };
}
