import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Layout/Header";

import Landing from "./components/Layout/Landing";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from 'jwt-decode';
import setJWTToken from "./utils/setJWTToken"
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/userActions";
import Chat from "./components/chat/Chat";
const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTToken(jwtToken);
  const decode_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decode_jwtToken
  })
}

class App extends Component {
  showLoggedOutOptions() {
    let items = [];
    items.push(<Route exact path="/login" component={Login} />);
    items.push(<Route exact path="/register" component={Register} />);
    return items;
  }
  showLoogedInOptions(user) {
    let items = [];


    items.push(<Route exact path="/logout" component={logout} />);
  
    items.push(<Route exact path="/chat" component={Chat} />);
    return items;
  }
  render() {
    const jwtToken = localStorage.jwtToken;
    let loggedIn = false;
    let user = null;
    if (jwtToken) {
      loggedIn = true;
      user = jwt_decode(jwtToken);
    

    }
    return (
      <Provider store={store}>


        <BrowserRouter>
          <div className="App">
            <Header />
            <Switch>
              {loggedIn && this.showLoogedInOptions(user)}
              {!loggedIn && this.showLoggedOutOptions()}
              <Route path="/" component={Landing} />
                 
            </Switch>
          </div>
        </BrowserRouter>

      </Provider>
    );
  }
}

export default App;
