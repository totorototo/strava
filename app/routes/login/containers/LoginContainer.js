//react
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//actions
import * as loginActions from '../../../actions/login'


import Login from '../../../components/login/Login'

class LoginContainer extends Component {

    render() {
        const{loginActions} = this.props;

        return (
            <Login login={loginActions.login}/>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
