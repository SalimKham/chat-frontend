/* eslint-disable import/no-anonymous-default-export */
import { GET_SUBJECT_LIST, GET_GROUPE_LIST_BY_TEACHER, GET_TUTORIAL, ADD_COMMENT, DELETE_QUESTIONNARY, GET_ALL_TUTORIALS } from "../actions/types";

const initialState = {
    groupes: {},
    list: null,
    selected: null,
    subjects: {}
};


export default function (state = initialState, action) {
    switch (action.type) {


        case GET_SUBJECT_LIST:
            return {
                ...state,
                subjects: action.payload
            }

        case GET_GROUPE_LIST_BY_TEACHER:
            return {
                ...state,
                groupes: action.payload
            }
        case GET_TUTORIAL:

            return {
                ...state,
                selected: action.payload
            }
        case GET_ALL_TUTORIALS:
            return {
                ...state,
                list: action.payload
            }
        case DELETE_QUESTIONNARY:
            return {
                ...state,
                selected: deleteQuestionnary(state)
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: updateNbrComment(state)
            }

        default:
            return state;
    }
}


export const updateNbrComment = (state) => {
    state.selected.nbrComment = parseInt(state.selected.nbrComment) + 1;

    return state.selected;
}

export const deleteQuestionnary = (state) => {
    state.selected.questionnary = null;

    return state.selected;
}
