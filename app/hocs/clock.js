import React, { Component } from "react";
import hoistStatics from "hoist-non-react-statics";

// will pass the props now (the current date) WrappedComponent and update it every seconds by default
export default (
  WrappedComponent,
  { getDate = () => new Date(), tickInterval = 1000 } = {}
) => {
  class Clock extends Component {
    state = {
      time: getDate()
    };

    componentDidMount() {
      this.timerID = setInterval(
        () => this.setState({ time: getDate() }),
        tickInterval
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    render() {
      return <WrappedComponent {...this.props} now={this.state.time} />;
    }
  }

  return hoistStatics(Clock, WrappedComponent);
};
