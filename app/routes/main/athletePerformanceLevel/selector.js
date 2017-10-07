import { getCurrentUserID } from "../../../store/state/appState/selectors";
import {
  getEntity,
  getValueFrom
} from "../../../store/state/entities/selectors";
// import { isValid } from "../../../dataDefinitions/defects";

const athletePerformanceLevelViewSelector = state => {
  const currentUserID = getCurrentUserID(state);
  const performance = getValueFrom(
    getEntity(state, "athletes", currentUserID),
    "performance"
  );

  return {
    performance
  };
};

export default athletePerformanceLevelViewSelector;
