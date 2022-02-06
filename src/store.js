import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import jwt_decode from 'jwt-decode';
import setJWTToken from "./utils/setJWTToken"



 


const initalState = {}; 
const checkTokenExperationMiddleware = store =>next => action=>{
  const jwtToken = localStorage.jwtToken;


if (jwtToken) {
  setJWTToken(jwtToken);
  const decode_jwtToken = jwt_decode(jwtToken);

  const currentTime = Date.now() / 1000;
  if (parseInt(decode_jwtToken.exp) < Math.round(currentTime)) {
    window.localStorage.clear();
    window.location.href = "/";

  } 
}
next(action);
}
const middleware = [checkTokenExperationMiddleware,thunk];

let store;
const devtools =  window.__REDUX_DEVTOOLS_EXTENSION__ &&
window.__REDUX_DEVTOOLS_EXTENSION__()

if (window.navigator.userAgent.includes("Firefox") && devtools) {
  store = createStore(
    rootReducer,
    initalState,
    compose(
      applyMiddleware(...middleware),
     devtools
    )
  );
} else {
  store = createStore(
    rootReducer,
    initalState,
    compose(applyMiddleware(...middleware))
  );
}

export default store;
