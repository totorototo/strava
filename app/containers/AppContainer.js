// react
import React, { Component, PropTypes } from 'react';

// rnrf
import { Router } from 'react-native-router-flux';

import { Provider, connect } from 'react-redux';

class AppContainer extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    scenes: PropTypes.object.isRequired,
  };

  // componentWillReceiveProps(nextProps) {
  // }

  render() {
    const { scenes, store } = this.props;

    return (
      <Provider store={store}>
        <Router>
          {scenes}
        </Router>
      </Provider>
    );
  }
}

export default connect()(AppContainer);
