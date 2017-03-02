import { RETRIEVE_ATHLETE_GEAR } from '../constants/actionTypes';

export function retrieveAthleteGear(details) {
  return {
    type: RETRIEVE_ATHLETE_GEAR,
    details,
  };
}
