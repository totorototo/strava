import * as types from "../constants/actionTypes";

export function login() {
    return {
        type: types.LOGIN
    }
}

export function getAcessToken(access_token){
    return{
        type: types.GET_ACCESS_TOKEN,
        access_token
    }
}

export function getTokent(token){
    return{
        type: types.GET_TOKEN,
        token
    }
}