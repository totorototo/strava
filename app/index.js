//react-native
import React, {Component} from 'react';
import{Linking} from 'react-native';

//redux
import {Provider, connect} from 'react-redux'

//actions
import {getTemporaryAcessToken} from './actions/login'

//temp
import { Actions, Router, Scene } from 'react-native-router-flux'
import HomeContainer from './routes/home/containers/HomeContainer'
import LoginContainer from './routes/login/containers/LoginContainer'


//store
import configureStore from './store/configureStore';


const store = configureStore();

//TODO: use react navigation or react-router v4 instead.
const Scenes = Actions.create(
    <Scene key="root" hideNavBar={true}>
        <Scene key="login" component={LoginContainer} hideNavBar={true}/>
        <Scene key="localhost" component={HomeContainer}/>
    </Scene>
);

const ConnectedRouter = connect()(Router);

function handleOpenURL(url) {

    if(url != null){
        let myRegexp = /(?:&code=)(\w*)/g;
        let match = myRegexp.exec(url);
        store.dispatch(getTemporaryAcessToken(match[1]));
    }
}

Linking.addEventListener('url',(event) => handleOpenURL(event.url));


export default class App extends Component {

    constructor() {
        super();
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
            <Provider store={store}>
                <ConnectedRouter scenes={Scenes}/>
            </Provider>
        );
    }
}