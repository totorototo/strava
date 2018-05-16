export const token = state => state.appState.login.accessToken;

export const getCurrentUserID = state =>
  state.appState["@@/data"].currentUserID;

export const getCurrentClubID = state =>
  state.appState["@@/data"].currentClubID;

export const getCurrentRaceID = state =>
  state.appState["@@/data"].currentRaceID;

export const getCurrentClubMembers = state => {
  if (state.appState["@@/data"].currentClubID === "loading") return [];
  return (
    state.entities.clubs[state.appState["@@/data"].currentClubID].members &&
    state.entities.clubs[state.appState["@@/data"].currentClubID].members.map(
      id => state.entities.athletes[id]
    )
  );
};
