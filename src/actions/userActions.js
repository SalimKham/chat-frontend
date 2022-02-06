import axios from 'axios';
import { GET_ERRORS ,GET_USERS_LIST, GET_PROFILE, GET_STUDENT_GROUPES } from './types';
import setJWTToken from '../utils/setJWTToken';

export const createUser = (newUser, history, type) => async dispatch => {
    try {

        await axios.post("/api/users/register/" + type, newUser);
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



export const confirm = (id, code) => async dispatch => {
    try {


        await axios.post("/api/users/confirm/" + id + "/" + code);
        window.location.href = "/login";
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

export const getProfile = (id) => async dispatch => {
    try {
        const res = await axios.get("/api/users/"+id);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}


export const getStudentGroupes = () => async dispatch => {
    try {
        const res = await axios.get("/api/users/StudentGroupes");
        console.log("student _groupes");
        console.log(res.data);
        dispatch({
            type: GET_STUDENT_GROUPES,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getUserList = () => async dispatch => {
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
export const logout = () =>  async () => {
 
    window.localStorage.clear();
    window.location.href = "/";
}