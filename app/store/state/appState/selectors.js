export const token = state => state.appState.login.accessToken;
export const getCurrentUserID = state =>
  state.appState["@@/data"].currentUserID;
