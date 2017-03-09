import { authenticationFlowSaga } from '../store/sagas/appSagas/login';
import login from '../store/reducers/appState/login';
import navigation from '../store/reducers/appState/navigation';

export default {
  sagas: [authenticationFlowSaga],
  reducersTrees: [
    {
      appState: {
        login: { reducer: login },
        navigation: { reducer: navigation },
      },
    },
  ],
};
