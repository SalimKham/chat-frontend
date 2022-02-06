/* eslint-disable import/no-anonymous-default-export */
import { GET_GROUPE, GET_GROUPE_LIST, ADD_GROUPE, UPDATE_GROUPE_LIST, ACCEPT_STUDENT_IN_GROUPE, LEAVE_GROUPE } from '../actions/types';

const initialState = {
    groupe: null,
    list: [],
    students: null
};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GROUPE_LIST:
            return {
                ...state,
                list: action.payload
            }

        case ADD_GROUPE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case UPDATE_GROUPE_LIST:
            return {
                ...state,
                list: updateList(state, action.payload)
            }
        case GET_GROUPE:
            return {
                ...state,
                groupe: action.payload,
                students: action.payload.students,
            }


        case ACCEPT_STUDENT_IN_GROUPE:
            return {
                ...state,
                groupe: addStudentToGroupe(state.groupe, action.payload)
            }

        case LEAVE_GROUPE:
            return {
                ...state,
                groupe: LeaveGroupe(state.groupe, action.payload.id_student),
                students: updateStudentList(state, action.payload.id_student)
            }
        default:
            return state;
    }
}
export const LeaveGroupe = (groupe, id) => {

    if (groupe && groupe.acceptedStudents)
        groupe.acceptedStudents = groupe.acceptedStudents.replace("" + id, "");
    return groupe;
}
export const selectGroupe = (state, id) => {
    state.list.map(groupe => {
        if (groupe.id === id)
            return groupe;
        return null
    })
    return null;
}

export const updateStudentList = (state, id) => {
    if (!state.students)
        return state.students;
    return state.students.filter(
        student => student.id !== id
    );
}

export const addStudentToGroupe = (groupe, payload) => {
    groupe.acceptedStudents = groupe.acceptedStudents + "/" + payload;
    return groupe;
}

export const updateList = (state, payload) => {
    switch (payload.state) {
        case 1:
            return state.list.filter(
                user => user.id !== payload.index
            );
        case 2:
            state.list[payload.index].state = payload.newState;
            break;
        default:
            break;

    }

    return state.list;
}
