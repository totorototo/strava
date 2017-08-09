import { getCurrentRaceID } from "../../../store/state/appState/selectors";
import { getEntity } from "../../../store/state/entities/selectors";

const raceViewSelector = state => {
  const currentRaceID = getCurrentRaceID(state);
  return {
    race: getEntity(state, "races", currentRaceID)
  };
};

export default raceViewSelector;
