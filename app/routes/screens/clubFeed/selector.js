import { getCurrentClubID } from "../../../store/state/appState/selectors";
import {
  getEntity,
  getValueFrom,
  getValidEntities,
  bindState
} from "../../../store/state/entities/selectors";

const clubFeedViewSelector = (/* ownProps */) => {
  const currentClub = getEntity("clubs", getCurrentClubID());

  return {
    clubMembers: getValidEntities(
      "athletes",
      getValueFrom(currentClub, "members")
    )
  };
};

export default bindState(clubFeedViewSelector);
