import {
    RETRIEVE_ATHLETE_DETAILS,
    GET_ATHLETE_CLUBS,
    RETRIEVE_ATHLETE_CLUBS,
    GET_ATHLETE_GEAR,
    RETRIEVE_ATHLETE_GEAR,
    GET_ATHLETE_STATS,
    RETRIEVE_ATHLETE_STATS,
    SET_CURRENT_ATHLETE,
} from '../constants/actionTypes';

export function setCurrentAthlete(athleteID) {
  return {
    type: SET_CURRENT_ATHLETE,
    athleteID,
  };
}

export function retrieveAthleteDetails(athleteID, details) {
  return {
    type: RETRIEVE_ATHLETE_DETAILS,
    athleteID,
    details,
  };
}

export function getAthleteClubs(athleteID) {
  return {
    type: GET_ATHLETE_CLUBS,
    athleteID,
  };
}

export function retrieveAthleteClubs(athleteID, clubs) {
  return {
    type: RETRIEVE_ATHLETE_CLUBS,
    athleteID,
    clubs,
  };
}

export function getAthleteStats(athleteID) {
  return {
    type: GET_ATHLETE_STATS,
    athleteID,
  };
}

export function retrieveAthleteStats(athleteID, stats) {
  return {
    type: RETRIEVE_ATHLETE_STATS,
    athleteID,
    stats,
  };
}

export function getAthleteGear(athleteID) {
  return {
    type: GET_ATHLETE_GEAR,
    athleteID,
  };
}

export function retrieveAthleteGear(athleteID, gear) {
  return {
    type: RETRIEVE_ATHLETE_GEAR,
    athleteID,
    gear,
  };
}
