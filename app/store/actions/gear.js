import { GET_ATHLETE_GEAR, RETRIEVE_ATHLETE_GEAR } from '../constants/actionTypes';

export function getAthleteGear() {
  return {
    type: GET_ATHLETE_GEAR,
  };
}

export function retrieveAthleteGear(details) {
  return {
    type: RETRIEVE_ATHLETE_GEAR,
    details,
  };
}
