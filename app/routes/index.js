import React from 'react';
import { Scene } from 'react-native-router-flux';

import LoginContainer from './login/containers/LoginContainer';
import HomeContainer from './home/containers/HomeContainer';

// TODO: Use Actions.Create(....)
export default(
  <Scene key="root" hideNavBar>
    <Scene key="login" component={LoginContainer} />
    <Scene key="home" component={HomeContainer} />
  </Scene>
);

