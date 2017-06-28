// sagas
import { authenticationFlowSaga } from "./login";
import { athleteSaga } from "./athlete";

export default [authenticationFlowSaga, athleteSaga];
