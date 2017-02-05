//redux-saga
import {fork} from 'redux-saga/effects'

//sagas
import {authenticationFlowSaga} from './login'

export default function* root() {
    yield [
        fork (authenticationFlowSaga)
    ]
}