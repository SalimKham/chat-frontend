import axios from 'axios';
import { GET_ERRORS ,GET_USERS_LIST  } from './types';
import setJWTToken from '../utils/setJWTToken';

export const createUser = (newUser, history) => async dispatch => {
    try {

        await axios.post("/api/users/register/", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}






export const login = (loginRequest) => async dispatch => {
    try {
        const res = await axios.post("/api/users/login", loginRequest);
        const { token } = res.data;
        window.localStorage.setItem("jwtToken", token);
        setJWTToken(token);
        window.location.href = "/";

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}






export const getUserList = () => async dispatch => {
    const loggedIn = (localStorage.jwtToken ? true : false);
    if (loggedIn) {
        try {

            const res = await axios.get("/api/users/all");
            dispatch({
                type: GET_USERS_LIST,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
    }
   
}
export const logout = () =>  async () => {
    try {
         await axios.post("/api/users/logout/");
        
    } catch (err) {
       
    }
    window.localStorage.clear();
    window.location.href = "/";
}