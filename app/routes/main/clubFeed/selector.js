import { getCurrentClubID } from "../../../store/state/appState/selectors";
import {
  getEntity,
  getValueFrom,
  getValidEntities
} from "../../../store/state/entities/selectors";

const decodePolyline = (encoded = "") => {
  if (!encoded) {
    return [];
  }
  const poly = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;

    do {
      b = encoded.charCodeAt((index += 1)) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt((index += 1)) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    const p = {
      latitude: lat / 1e5,
      longitude: lng / 1e5
    };
    poly.push(p);
  }

  return poly;
};

const clubFeedViewSelector = state => {
  const currentClub = getEntity(state, "clubs", getCurrentClubID(state));

  const activities = getValidEntities(
    state,
    "activities",
    getValueFrom(currentClub, "activities")
  );

  const updatedActivities = activities.map(activity => {
    const activityMap = getEntity(state, "maps", activity.map);
    const map = decodePolyline(activityMap.summary_polyline);
    return { ...activity, map };
  });

  return {
    club: currentClub,
    clubMembers: getValidEntities(
      state,
      "athletes",
      getValueFrom(currentClub, "members")
    ),
    activities: updatedActivities
  };
};

export default clubFeedViewSelector;
