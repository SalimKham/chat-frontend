/* eslint-disable import/no-anonymous-default-export */
import {  ADD_COMMENT, GET_COMMENT_BY_TYPE, DELETE_COMMENT } from "../actions/types";

const initialState = {
    comments: {},

};


export default function (state = initialState, action) {
    switch (action.type) {


        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }

            case GET_COMMENT_BY_TYPE:
            return {
                ...state,
                comments: action.payload
            }


          
            case DELETE_COMMENT :
            return {
                ...state,
                comments: state.comments.filter(
                    comment => comment.id !== action.payload)
            }



        default:
            return state;
    }
}

