import { authenticationFlowSaga } from "./login";
import { activitiesSaga } from "../activities";
import { clubsSaga } from "../clubs";
import { raceSaga } from "../race";
import { locationSaga } from "../geolocation";

export default {
  authenticationFlowSaga,
  activitiesSaga,
  clubsSaga,
  raceSaga,
  locationSaga
};
