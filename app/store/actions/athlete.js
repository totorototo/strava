import {
    RETRIEVE_ATHLETE_DETAILS,
    GET_ATHLETE_ACTIVITIES,
    RETRIEVE_ATHLETE_ACTIVITIES,
    GET_ATHLETE_CLUBS,
    RETRIEVE_ATHLETE_CLUBS,
    GET_ATHLETE_GEAR,
    RETRIEVE_ATHLETE_GEAR,
} from '../constants/actionTypes';

export function retrieveAthleteDetails(details) {
  return {
    type: RETRIEVE_ATHLETE_DETAILS,
    details,
  };
}

export function getAthleteActivities() {
  return {
    type: GET_ATHLETE_ACTIVITIES,
  };
}

export function retrieveAthleteActivities(activities) {
  return {
    type: RETRIEVE_ATHLETE_ACTIVITIES,
    activities,
  };
}

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

export function getAthleteGear() {
  return {
    type: GET_ATHLETE_GEAR,
  };
}

export function retrieveAthleteGear(gear) {
  return {
    type: RETRIEVE_ATHLETE_GEAR,
    gear,
  };
}
