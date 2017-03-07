// sagas
import { authenticationFlowSaga } from './login';
import { athleteSaga } from './athlete';
import { activitySaga } from './activities';

export default [
  authenticationFlowSaga,
  athleteSaga,
  activitySaga,
];

