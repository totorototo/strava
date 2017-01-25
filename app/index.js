import React, {Component} from 'react';
import{Linking} from 'react-native';

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
        <Scene key="localhost" component={HomeContainer}/>
    </Scene>
);

//TODO: AppContainer?
const ConnectedRouter = connect()(Router);

function handleOpenURL(url) {

    if(url != null){
        let arr = url.split(/&code=/);
        let token = arr[1];
        Actions.localhost();
    }
}

Linking.addEventListener('url',(event) => handleOpenURL(event.url));

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            store: configureStore(),
        };
    }

    componentDidMount() {

        let url = Linking.getInitialURL()
            .then(handleOpenURL)
            .catch(err => console.error('An error occurred', err));
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', handleOpenURL);
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <ConnectedRouter scenes={Scenes}/>
            </Provider>
        );
    }
}