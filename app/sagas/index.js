//redux-saga
import { takeEvery, fork } from 'redux-saga/effects'

//sagas
import * as authentication from './login'

//action
import * as types from '../constants/actionTypes'

export default function* root() {
    yield [
        takeEvery(types.LOGIN, authentication.login)
    ]
}