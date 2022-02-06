/* eslint-disable import/no-anonymous-default-export */
import { UPDATE_USER_STATE, GET_FIELD_LIST, UPDATE_FIELD_STATE, ADD_FIELD, ADD_SUBJECT, GET_SUBJECT_LIST, UPDATE_SUBJECT_STATE } from '../actions/types';
import { GET_USERS_LIST } from '../actions/types';
const initialState = {
    userList: {},
    groupeList: {},
    fieldList: {},
    subjectList: {}
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_USERS_LIST:
            return {
                ...state,
                userList: action.payload
                
            }
        case GET_FIELD_LIST:
            return {
                ...state,
                fieldList: action.payload
            }
        case GET_SUBJECT_LIST:
            return {
                ...state,
                subjectList: action.payload
            }
        case UPDATE_USER_STATE:
            return {
                ...state,
                userList: updateUserBlockState(state, action.payload)
            }
        case ADD_FIELD:
            return {
                ...state,
                fieldList: [...state.fieldList, action.payload]
            }
        case ADD_SUBJECT:
            return {
                ...state,
                subjectList: [...state.subjectList, action.payload]
            }

        case UPDATE_FIELD_STATE:
            return {
                ...state,
                fieldList: updateFieldState(state, action.payload)
            }
        case UPDATE_SUBJECT_STATE:
            return {
                ...state,
                subjectList: updateSubjectState(state, action.payload)
            }

        default:
            return state;
    }
}


export const updateFieldState = (state, payload) => {
    switch (payload.state) {
        case 1:
            state.fieldList[payload.index].is_arrchived = !(state.fieldList[payload.index]);
            return state;
        case 2:
            return state.fieldList.filter(
                field => field.id !== payload.index
            );
        default:
    }


    return state;
}
export const updateSubjectState = (state, payload) => {
    switch (payload.state) {
        case 1:
            state.subjectList[payload.index].is_arrchived = !(state.fieldList[payload.index]);
            return state;
        case 2:
            return state.subjectList.filter(
                subject => subject.id !== payload.index
            );
        default:
    }


    return state;
}
export const updateUserBlockState = (state, payload) => {
    switch (payload.state) {
        case 1:
            return state.userList.filter(
                user => user[0] !== payload.index
            );
        case 2:
            state.userList[payload.index][3] = 1;
            break;

        case 3:
            if (state.userList[payload.index][3]  === 3)
                state.userList[payload.index][3] = 1;
            else
                state.userList[payload.index][3] = 3;
            break
        default:
            break;

    }

    return state.userList;
}
