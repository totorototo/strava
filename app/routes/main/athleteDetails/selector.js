import idx from "idx";

import { getCurrentUserID } from "../../../store/state/appState/selectors";
import { getEntity } from "../../../store/state/entities/selectors";

const getAthletePerformances = props => idx(props, _ => _.performance.details);

const athleteDetailsViewSelector = state => {
  const currentUserID = getCurrentUserID(state);
  const athlete = getEntity(state, "athletes", currentUserID);
  const performances = getAthletePerformances(athlete);

  return {
    athlete,
    performances
  };
};

export default athleteDetailsViewSelector;
