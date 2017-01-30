//redux-saga
import {put, select, call, take} from 'redux-saga/effects'

//helpers
import {dataset} from '../helpers/dataset'

//router
import {Actions} from 'react-native-router-flux';

//actions
import * as login from '../actions/login';

//constants
import * as rest from '../constants/rest'
import * as types from '../constants/actionTypes'

function* logout(){
    try{
        //1- redirect to login component
        yield call(Actions.login);

    }catch (error){
        throw error;
    }
}

function* authorize(access_token) {
    try {

        //1- convert access-token
        const response = yield(dataset, rest.API_ENDPOINT, rest.RESOURCES.OAUTH, rest.METHODS.POST);

        //2- store token
        yield put(login.getAccessToken(response.token));

        //3- route application
        yield call(Actions.home);

        return response.token;
    }
    catch (error) {
        throw error;
    }
}

export function* authenticationFlowSaga() {
    try {

        while (true) {

            const {temporary_access_token} = yield take(types.GET_TEMPORARY_ACCESS_TOKEN);
            let token = yield call(authorize, temporary_access_token);

            if (token) {
                let userSignedOut;
                while (!userSignedOut) {

                    yield take(types.LOGOUT);
                    userSignedOut = true;
                    token = null;

                    yield call(logout);
                }
            }
        }
    }
    catch (error) {
        //TODO: cancellation task?
    }
}