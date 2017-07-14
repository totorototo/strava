import { getCurrentClubID } from "../../../store/state/appState/selectors";
import {
  getEntity,
  getValueFrom,
  getValidEntities
} from "../../../store/state/entities/selectors";

const clubFeedViewSelector = state => {
  const currentClub = getEntity(state, "clubs", getCurrentClubID(state));
  return {
    club: currentClub,
    clubMembers: getValidEntities(
      state,
      "athletes",
      getValueFrom(currentClub, "members")
    )
  };
};

export default clubFeedViewSelector;
