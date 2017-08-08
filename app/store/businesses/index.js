import rootReducer from "../state/rootReducer";
import appSagas from "../sagas/appSagas/index";

export default {
  reducersTree: {
    reducer: rootReducer
  },
  sagasMap: appSagas
};
