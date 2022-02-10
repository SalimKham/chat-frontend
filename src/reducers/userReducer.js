/* eslint-disable import/no-anonymous-default-export */
import { SET_CURRENT_USER,UPDATE_PROFILE_PICTURE } from '../actions/types';

const initialState = {
    user: null,
   
    validToken: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_CURRENT_USER:

            return {
                ...state,
                validToken: (action.payload ? true : false),
                user: action.payload
            }
            case UPDATE_PROFILE_PICTURE:
                return {
                    ...state,
                    user: updateProfilePicture(state, action.payload),
                }
    




        default:
            return state;
    }
}

export const updateProfilePicture = (state, payload) => {
    
        state.user.photo = payload
    



    return state.user;
}


