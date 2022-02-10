import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import ChatReducer from "./ChatReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  errors: errorReducer,
  security : userReducer,
  admin:adminReducer,
  chat:ChatReducer
});
