import { RETRIEVE_ATHLETE_ACTIVITIES } from '../constants/actionTypes';

export function retrieveAthleteActivities(activities) {
  return {
    type: RETRIEVE_ATHLETE_ACTIVITIES,
    activities,
  };
}
