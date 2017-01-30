//redux-saga
import { fork } from 'redux-saga/effects'

//sagas
import * as authentication from './login'

//action
import * as types from '../constants/actionTypes'

export default function* root() {
    yield [
        fork (authentication.authenticationFlowSaga)
    ]
}