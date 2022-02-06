import axios from 'axios';
import { UPDATE_USER_STATE,GET_ERRORS,GET_FIELD_LIST, UPDATE_FIELD_STATE, ADD_FIELD, ADD_SUBJECT, GET_SUBJECT_LIST, UPDATE_SUBJECT_STATE } from './types';

export const activateUser = (id,index) => async dispatch => {
    try {
        await axios.post("/api/admin/activate/" + id);
        dispatch({
            type:   UPDATE_USER_STATE,
            payload: {

                index : index,
                state:2
            }
        })


    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const addField = (newField) => async dispatch => {
    try {
       const res = await axios.post("/api/admin/addField/" ,newField);
     
       dispatch({
        type: ADD_FIELD,
        payload: res.data
    });
    dispatch({
        type: GET_ERRORS,
        payload: { result: "added!" }
    });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const addSubject = (id , newSubject) => async dispatch => {
    try {
       const res = await axios.post("/api/admin/field/addSubject/"+id ,newSubject);
       dispatch({
        type: ADD_SUBJECT,
        payload: res.data
    });
    dispatch({
        type: GET_ERRORS,
        payload: { result: "added!" }
    });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}


export const blockUnBlockUser = (id,index) => async dispatch => {
    try {
        await axios.post("/api/admin/blockUnblock/" + id);
      
        dispatch({
            type:   UPDATE_USER_STATE,
            payload: {
                index : index,
                state:3
            }
        })

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}


export const archiveField = (id,index) => async dispatch => {
    try {
        
        await axios.post("/api/admin/field/archive/" + id);
      
        dispatch({
            type:   UPDATE_FIELD_STATE,
            payload: {
                index : index,
                state:1
            }
        })

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}


export const getFieldList = () => async dispatch => {
    try {
        const res = await axios.get("/api/admin/field/all");
      
        dispatch({
            type:  GET_FIELD_LIST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}
export const getSubjectList = () => async dispatch => {
    try {
        const res = await axios.get("/api/admin/field/subject/all");
       console.log(res.data);
        dispatch({
            type:  GET_SUBJECT_LIST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const deleteUser = (id ) => async dispatch => {
    try {
         console.log("deleting");
        if (
            ! window.confirm(
              "Are you sure? This will delete this User."
            )
          ) 
          return;
         console.log("deleteing from serfver")
        await axios.delete("/api/admin/deleteUser/" + id);
        dispatch({
            type:   UPDATE_USER_STATE,
            payload: {

                index : id,
                state:1
            }
        })


    } catch (err) {
       console.log(err);
    }
}

export const deleteField = (id ) => async dispatch => {
    try {
         console.log("deleting");
        if (
            ! window.confirm(
              "Are you sure? This will delete this User."
            )
          ) 
          return;
         console.log("deleteing from serfver")
        await axios.delete("/api/admin/field/" + id);
        dispatch({
            type:   UPDATE_FIELD_STATE,
            payload: {

                index : id,
                state:2
            }
        })


    } catch (err) {
       console.log(err);
    }
}
export const deleteSubject = (id ) => async dispatch => {
    try {
         console.log("deleting");
        if (
            ! window.confirm(
              "Are you sure? This will delete this User."
            )
          ) 
          return;
        await axios.delete("/api/admin/field/subject/" + id);
        dispatch({
            type:   UPDATE_SUBJECT_STATE,
            payload: {

                index : id,
                state:2
            }
        })


    } catch (err) {
       console.log(err);
    }
}
