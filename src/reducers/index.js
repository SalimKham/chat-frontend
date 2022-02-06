import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import groupeReducer from "./groupeReducer";
import tutorialReducer from "./tutorialReducer";
import CommentReducer from "./CommentReducer";
import ChatReducer from "./ChatReducer";

export default combineReducers({
  errors: errorReducer,
  security : userReducer,
  admin:adminReducer,
  groupe:groupeReducer,
  tutorial : tutorialReducer,
  comment:CommentReducer,
  chat:ChatReducer
});
