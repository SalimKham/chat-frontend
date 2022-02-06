import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Layout/Header";

import How from "./components/Layout/How";
import Landing from "./components/Layout/Landing";
import Login from "./components/users/Login";
import Confirmation from "./components/users/Confirmation";
import Register from "./components/users/Register";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from 'jwt-decode';
import setJWTToken from "./utils/setJWTToken"
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/userActions";
import Profile from "./components/users/Profile";
import UserList from "./components/Admin/UserList";
import GroupeList from "./components/Lists/GroupeList";
import FieldList from "./components/Admin/FieldList";
import SubjectList from "./components/Admin/SubjectList";
import GroupeStudentList from "./components/Lists/GroupeStudentList";
import AddTutorial from "./components/Tutorials/AddTutorial";
import ViewTuturial from "./components/Tutorials/ViewTuturial";
import addQuestionnary from "./components/Questionnary/addQuestionnary";
import Tutorials from "./components/Lists/Tutorials";
import Chat from "./components/chat/Chat";
import Editor from "./components/Editor";
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
    items.push(<Route exact path="/confirmation/:id" component={Confirmation} />);
    return items;
  }
  showLoogedInOptions(user) {
    let items = [];
    items.push(<Route exact path="/groupes" component={GroupeList} />);
    items.push(<Route exact path="/groupes/students/:id" component={GroupeStudentList} />);
    if (user.type === 1) {
      items.push(<Route exact path="/users" component={UserList} />);
      items.push(<Route exact path="/fields" component={FieldList} />);
      items.push(<Route exact path="/subjects" component={SubjectList} />);
    } else if (user.type === 3) {
      items.push(<Route exact path="/newTutorial" component={AddTutorial} />);
      items.push(<Route exact path="/newQuestionnary/:id" component={addQuestionnary} />);
    }
    items.push(<Route exact path="/viewTutorial/:id" component={ViewTuturial} />);
    
    items.push(<Route exact path="/profile/:id/:tab" component={Profile} />);

    items.push(<Route exact path="/logout" component={logout} />);
    items.push(<Route exact path="/tutorials" component={Tutorials} />);
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
              <Route path="/how" component={How} />
              <Route path="/edit" component={Editor} />
              <Route path="/" component={Landing} />
                 
            </Switch>
          </div>
        </BrowserRouter>

      </Provider>
    );
  }
}

export default App;
