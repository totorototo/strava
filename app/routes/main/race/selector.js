import {
  getCurrentRaceID,
  getCurrentClubID
} from "../../../store/state/appState/selectors";
import {
  getEntity,
  getValueFrom,
  getValidEntities
} from "../../../store/state/entities/selectors";

const raceViewSelector = state => {
  const currentRaceID = getCurrentRaceID(state);
  const currentClub = getEntity(state, "clubs", getCurrentClubID(state));
  return {
    race: getEntity(state, "races", currentRaceID),
    clubMembers: getValidEntities(
      state,
      "athletes",
      getValueFrom(currentClub, "members")
    )
  };
};

export default raceViewSelector;
