import { authenticationFlowSaga } from "./login";
import { activitiesSaga } from "../activities";

export default [authenticationFlowSaga, activitiesSaga];
