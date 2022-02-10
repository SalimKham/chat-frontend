import axios from 'axios';
import { GET_ERRORS, GET_USER_INFO, UPDATE_PROFILE_PICTURE } from './types';
export const editPassword = (oldPassword, newPassword) => async dispatch => {
    try {

        await axios.post("/api/profile/updateAccount/" + oldPassword + "/" + newPassword);
        dispatch({
            type: GET_ERRORS,
            payload: {
                result: "updated"
            }
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const getProfile = () => async dispatch => {
    try {

        
        const res = await axios.get("/api/profile/getProfile/");
      
        dispatch({
            type: GET_USER_INFO,
            payload: res.data
        }
        );
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const updateProfile = (newInfo) => async dispatch => {
    try {
        
        await axios.post("/api/profile/updateProfile/", newInfo);
        dispatch({
            type: GET_USER_INFO,
            payload: newInfo
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}



export const uploadPicture = (file, crop) => async dispatch => {
    try {
        
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const res= await axios.post("/api/users/updatephoto/?cropString=" + crop, formData, config);
     
        dispatch({
            type: UPDATE_PROFILE_PICTURE,
            payload: res.data
           
        });
      
   
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}
