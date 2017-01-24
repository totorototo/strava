import React, {Component} from 'react';

import configureStore from './store/configureStore';

//temp
import { Actions, Router, Scene } from 'react-native-router-flux'
import HomeContainer from './routes/home/containers/HomeContainer'
import LoginContainer from './routes/login/containers/LoginContainer'

import { Provider, connect } from 'react-redux'

//TODO: refacto -> move to /route/index.js
const Scenes = Actions.create(
    <Scene key="root" hideNavBar={true}>
        <Scene key="login" component={LoginContainer} hideNavBar={true}/>
        <Scene key="home" component={HomeContainer}/>
    </Scene>
);

//TODO: AppContainer?
const ConnectedRouter = connect()(Router);

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            store: configureStore(),
        };
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <ConnectedRouter scenes={Scenes}/>
            </Provider>
        );
    }
}