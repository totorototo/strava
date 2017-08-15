import { getCurrentUserID } from "../../../../store/state/appState/selectors";
import { getEntity } from "../../../../store/state/entities/selectors";

const performanceMeterViewSelector = state => {
  const currentUserID = getCurrentUserID(state);
  return {
    athlete: getEntity(state, "athletes", currentUserID)
  };
};

export default performanceMeterViewSelector;
