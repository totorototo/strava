import { getCurrentClubID } from "../../../store/state/appState/selectors";
import {
  getEntity,
  getValueFrom,
  getValidEntities
} from "../../../store/state/entities/selectors";

const clubFeedViewSelector = state => {
  const currentClub = getEntity(state, "clubs", getCurrentClubID(state));
  const activities = getValidEntities(
    state,
    "activities",
    getValueFrom(currentClub, "activities")
  );
  const mapIDs = activities.map(activity => activity.map);

  const maps = getValidEntities(state, "maps", mapIDs);

  return {
    club: currentClub,
    clubMembers: getValidEntities(
      state,
      "athletes",
      getValueFrom(currentClub, "members")
    ),
    activities,
    maps
  };
};

export default clubFeedViewSelector;
