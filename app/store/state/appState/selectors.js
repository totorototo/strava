export const token = state => state.appState.login.accessToken;

export const getCurrentUserID = state =>
  state.appState["@@/data"].currentUserID;

export const getCurrentClubID = state =>
  state.appState["@@/data"].currentClubID;
