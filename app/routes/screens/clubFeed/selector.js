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
    ),
    activities: getValidEntities(
      state,
      "activities",
      getValueFrom(currentClub, "activities")
    ),
    maps: getValidEntities(
      state,
      "maps",
      getValidEntities(
        state,
        "activities",
        getValueFrom(currentClub, "activities")
      ).map(activity => activity.map)
    )
  };
};

export default clubFeedViewSelector;
