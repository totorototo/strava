import * as types from "../constants/actionTypes";

export function login() {
    return {
        type: types.LOGIN
    }
}

export function getTemporaryAcessToken(temporary_access_token){
    return{
        type: types.GET_TEMPORARY_ACCESS_TOKEN,
        temporary_access_token
    }
}

export function getAccessToken(access_token){
    return{
        type: types.GET_ACCESS_TOKEN,
        access_token
    }
}

export function logout(){
    return{
        type: types.LOGOUT
    }
}