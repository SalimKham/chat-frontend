/* eslint-disable import/no-anonymous-default-export */
import { GET_CHAT_MESSAGES, SEND_CHAT_MESSAGE } from "../actions/types";

const initialState = {
    list: {},
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_CHAT_MESSAGES:

            return {
                ...state,
                list: action.payload
            }
        case SEND_CHAT_MESSAGE:

            return {
                ...state,
                list:[...state.list,action.payload]
            }


        default:
            return state;
    }
}

