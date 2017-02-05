import {LOGIN, LOGOUT, GET_TEMPORARY_ACCESS_TOKEN, GET_ACCESS_TOKEN, } from "../constants/actionTypes";

export function login() {
    return {
        type: LOGIN
    }
}

export function getTemporaryAcessToken(temporary_access_token){
    return{
        type: GET_TEMPORARY_ACCESS_TOKEN,
        temporary_access_token
    }
}

export function getAccessToken(access_token){
    return{
        type: GET_ACCESS_TOKEN,
        access_token
    }
}

export function logout(){
    return{
        type: LOGOUT
    }
}