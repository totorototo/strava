import { bindActionCreators } from "redux";
import * as geoloactionActions from "../../../store/actions/geolocation";

const actionsCreator = dispatch => ({
  geoloactionActionsCreators: bindActionCreators(geoloactionActions, dispatch)
});

export default actionsCreator;
