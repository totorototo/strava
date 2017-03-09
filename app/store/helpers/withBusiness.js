import React, { Component, PropTypes } from 'react';

export default function withBusiness(business) {
  return function (WrappedComponent) {
    // ...and returns another component...
    return class extends Component {
      static contextTypes = {
        store: React.PropTypes.object,
      };

      constructor(props, context) {
        super(props, context);
        this.store = this.context.store;
      }

      componentWillMount() {
        this.store.registerBusiness(business);
      }

      componentWillUnmount() {
        this.store.unregisterBusiness(business);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  };
}
