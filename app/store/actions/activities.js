import { RETRIEVE_ATHLETE_ACTIVITIES } from '../constants/actionTypes';

export function retrieveAthleteActivities(list) {
  return {
    type: RETRIEVE_ATHLETE_ACTIVITIES,
    list,
  };
}
