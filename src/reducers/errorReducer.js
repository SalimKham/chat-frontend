/* eslint-disable import/no-anonymous-default-export */
import { GET_ERRORS, UPDATE_PROFILE_PICTURE } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case  UPDATE_PROFILE_PICTURE:
       return {
         result:"successful !!"
       }
    case GET_ERRORS:
      return action.payload;
     

    default:
      return state;
  }
}
