import { authenticationFlowSaga } from "./login";
import { activitiesSaga } from "../activities";
import { clubsSaga } from "../clubs";
import { remoteDataSaga } from "../remoteData/data";
import { raceSaga } from "../race";
import { locationSaga } from "../location";

export default {
  authenticationFlowSaga,
  activitiesSaga,
  clubsSaga,
  remoteDataSaga,
  raceSaga,
  locationSaga
};
