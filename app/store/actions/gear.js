import { RETRIEVE_ATHLETE_GEAR } from '../constants/actionTypes';

export function retrieveAthleteGear(gear) {
  return {
    type: RETRIEVE_ATHLETE_GEAR,
    gear,
  };
}
