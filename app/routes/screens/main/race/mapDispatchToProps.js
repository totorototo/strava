import { bindActionCreators } from "redux";
import * as geoloactionActions from "../../../../store/actions/geolocation";

const mapDispatchToProps = dispatch => ({
  boundActionCreators: bindActionCreators(geoloactionActions, dispatch)
});

export default mapDispatchToProps;
