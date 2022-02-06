import axios from 'axios';
import { GET_TUTORIAL, DELETE_QUESTIONNARY, GET_ALL_TUTORIALS, GET_ERRORS } from './types';
export const addTutorial = (id_subject ,allowedGroupes, tutorial , file) => async dispatch => {
    try {
     
        let details = JSON.stringify(tutorial);
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('subject', id_subject);
        formData.append('tutorial', details);
        formData.append('allowedGroupes' , allowedGroupes);
     
       
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        await axios.post("/api/tutorial/add/", formData, config);
        window.location.href = "/tutorials";
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const addQuestionnaryToTutorial = (id_subject , questions , responses) => async dispatch => {
    try {
        const questionnary = {
            "questions" : questions,
            "answers":responses
        }
       await axios.post("/api/tutorial/addQuestionnary/"+id_subject , questionnary);
       window.location.href = "/viewTutorial/"+id_subject;
    } catch (err) {
      
    }
}


export const deleteQuestionnary = (id ) => async dispatch => {
    try {
        if (
            ! window.confirm(
              "Are you sure? This will delete questionnary."
            )
          ) 
          return;
        await axios.delete("/api/tutorial/deleteQuestionnary/" + id);
        dispatch({
            type:   DELETE_QUESTIONNARY,
        })


    } catch (err) {
       console.log(err);
    }
}
export const deleteTutorial = (id ) => async dispatch => {
    console.log("deletein ::: "+id);
    try {
        if (
            ! window.confirm(
              "Are you sure?"
            )
          ) 
          return;
        await axios.delete("/api/tutorial/" + id);
        window.location.href = "/tutorials";

    } catch (err) {
       console.log(err);
    }
}

export const getTutorial = (id) => async dispatch => {
    try {
        

       const res =  await axios.get("/api/tutorial/"+id);
       dispatch({
        type: GET_TUTORIAL,
        payload: res.data
    })
    } catch (err) {
      
    }
}

export const getAllTutorials = () => async dispatch => {
    try {
    
       const res =  await axios.get("/api/tutorial/all");
      
       dispatch({
        type: GET_ALL_TUTORIALS,
        payload: res.data
    })
    } catch (err) {
      
    }
}

export const getContent = (file) => async dispatch => {
    try {
        
   
       const res =  await axios.get("/api/tutorial/pdfs/"+file);
      return res;
    } catch (err) {
      
    }
}