//redux-saga
import {put, select, call} from 'redux-saga/effects'

//helpers
import {dataset} from '../helpers/dataset'

import {Actions} from 'react-native-router-flux';

//constants
import * as rest from '../constants/rest'

export function* login(){
    try{
        //const response = yield call(fetch, rest.API_ENDPOINT, rest.RESOURCES.OAUTH, rest.METHODS.GET);
        yield call(Actions.home);
    }
    catch(error){
    }
}