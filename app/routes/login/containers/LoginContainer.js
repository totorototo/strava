// react
import React, { Component, PropTypes } from 'react';

// redux
import { connect } from 'react-redux';

// components
import Login from '../../../components/login/Login';

class LoginContainer extends Component {

  render() {
    return (
      <Login />
    );
  }
}

export default connect()(LoginContainer);
