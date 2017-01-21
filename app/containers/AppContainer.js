//react
import React, {Component, PropTypes} from 'react';
import {Router} from 'react-native-router-flux';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class AppContainer extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired,
        scenes: PropTypes.object.isRequired
    };

    componentWillReceiveProps(nextProps) {
    }

    render() {

        const {scenes, store} = this.props;

        return (
            <Provider store={store}>
                <Router>
                    {scenes}
                </Router>
            </Provider>
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
