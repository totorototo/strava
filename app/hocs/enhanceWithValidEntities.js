import React, { Component } from "react";
import hoistStatics from "hoist-non-react-statics";

import Loading from "../components/technical/loading/Loading";
import Faulty from "../components/technical/faulty/Faulty";
import { isFaulty, isLoading, getDefect } from "../dataDefinitions/defects";

export default test => WrappedComponent => {
  class EnhancedComponent extends Component {
    render() {
      const data = test(this.props);
      const faultyEntity = data.find(isFaulty);
      if (faultyEntity) return <Faulty message={getDefect(faultyEntity)} />;

      const loadingEntity = data.find(isLoading);
      if (loadingEntity) return <Loading />;

      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistStatics(EnhancedComponent, WrappedComponent);
};
