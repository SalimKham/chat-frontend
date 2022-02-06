/* eslint-disable import/no-anonymous-default-export */
import { SET_CURRENT_USER,  LEAVE_GROUPE, GET_PROFILE, UPDATE_PROFILE_PICTURE, GET_STUDENT_GROUPES } from '../actions/types';
import { GET_USER_INFO } from '../actions/types';
const initialState = {
    user: null,
    userInfo: null,
    studentGroupes: "",
    validToken: false,
    profile: null
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_CURRENT_USER:

            return {
                ...state,
                validToken: (action.payload ? true : false),
                user: action.payload
            }
        case GET_USER_INFO:
            return {
                ...state,
                userInfo: updateProfile(state, action.payload)
            }
        case GET_STUDENT_GROUPES:
            return {
                ...state,
                studentGroupes: action.payload
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case UPDATE_PROFILE_PICTURE:
            return {
                ...state,
                profile: updateProfilePicture(state, action.payload),
            }

        case LEAVE_GROUPE:
            return {
                ...state,
                studentGroupes: (state.studentGroupes ? state.studentGroupes.replace("" + action.payload.id_groupe, "") : "")
            }




        default:
            return state;
    }
}



export const updateProfile = (state, payload) => {
    state.profile.userInfo = payload;
    return state.profile;
}
export const updateProfilePicture = (state, payload) => {
    state.profile.userInfo.photo = payload;


    if ("" + state.profile.id === state.user.id) {
       
        state.user.photo = payload
    }



    return state.profile;
}

