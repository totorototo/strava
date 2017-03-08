import React, { Component } from 'react';

export default function withBusiness(WrappedComponent, business) {
  // ...and returns another component...
  return class extends Component {
    constructor(props) {
      super(props);
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
}

