import { authenticationFlowSaga } from "./login";
import { activitiesSaga } from "../activities";
import { clubsSaga } from "../clubs";
import { dataBaseSaga } from "../race";

export default [
  authenticationFlowSaga,
  activitiesSaga,
  clubsSaga,
  dataBaseSaga
];
