import axios from 'axios';
import { ADD_COMMENT, GET_ERRORS, GET_COMMENT_BY_TYPE, DELETE_COMMENT } from './types';
export const addComment = (idSubject,comment) => async dispatch => {
    try {
       const res = await axios.post("/api/comment/add/"+idSubject ,comment);
     
       dispatch({
        type: ADD_COMMENT,
        payload: res.data
    });

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const deleteComment = (id ) => async dispatch => {
    try {
        if (
            ! window.confirm(
              "Are you sure?"
            )
          ) 
          return;
        await axios.delete("/api/comment/" + id);
        dispatch({
            type:   DELETE_COMMENT,
            payload: id
            
        })


    } catch (err) {
       console.log(err);
    }
}

export const getComments = (idSubject) => async dispatch => {
    try {
        console.log(idSubject);
       const res = await axios.get("/api/comment/all/"+idSubject);
      console.log(res);
       dispatch({
        type: GET_COMMENT_BY_TYPE,
        payload: res.data
    });

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}