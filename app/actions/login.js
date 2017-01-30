import * as types from "../constants/actionTypes";

export function login() {
    return {
        type: types.LOGIN
    }
}

export function getTemporaryAcessToken(access_token){
    return{
        type: types.GET_TEMPORARY_ACCESS_TOKEN,
        access_token
    }
}

export function getAccessToken(token){
    return{
        type: types.GET_ACCESS_TOKEN,
        token
    }
}

export function logout(){
    return{
        type: types.LOGOUT
    }
}