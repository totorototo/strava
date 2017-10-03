import { getCurrentUserID } from "../../../store/state/appState/selectors";
import { getEntity } from "../../../store/state/entities/selectors";

const athletePerformanceLevelViewSelector = state => {
  const currentUserID = getCurrentUserID(state);
  return {
    athlete: getEntity(state, "athletes", currentUserID)
  };
};

export default athletePerformanceLevelViewSelector;
