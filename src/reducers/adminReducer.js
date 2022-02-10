/* eslint-disable import/no-anonymous-default-export */
import { GET_USERS_LIST } from '../actions/types';
const initialState = {
    userList: {}
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_USERS_LIST:
            return {
                ...state,
                userList: action.payload
                
            }
       
    

        default:
            return state;
    }
}






