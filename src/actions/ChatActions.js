import axios from 'axios';
import { GET_ERRORS, GET_CHAT_MESSAGES, SEND_CHAT_MESSAGE } from './types';
export const senMessage = (message) => async dispatch => {
    try {
        const res = await axios.post("/api/chat/send/",message);
        dispatch({
            type:  SEND_CHAT_MESSAGE,
            payload: updateList( res.data)
        })
       
    } catch (err) {
      console.log(err);
    }
}




export const updateList = (payload) => {

    let result = [];
    result.push(payload.id);
   result.push(payload.content);
   result.push(payload.sender);
   result.push(payload.receiver);
   result.push(payload.sendAt);
   result.push(payload.vue);

    return result;
}

export const getMessages = (id) => async dispatch => {
    try {
        const res = await axios.get("/api/chat/"+id);
       
        dispatch({
            type:  GET_CHAT_MESSAGES,
            payload: res.data
        })
       
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}
