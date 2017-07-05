import { authenticationFlowSaga } from "./login";
import { athleteSaga } from "../athlete";
import { activitiesSaga } from "../activities";

export default [authenticationFlowSaga, athleteSaga, activitiesSaga];
