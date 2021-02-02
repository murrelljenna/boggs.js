import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./Components/PrivateRoute.js"
import { withRouter } from "react-router";
import LoginForm from './Components/LoginForm';
import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Paperbase from "./TemplateApp.js"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      loggedIn: false,
    };
  }

  render() {
      return (
        <div className="App">
          <main>
            <Switch>
              <Route path="/login/" render={(props) => (
                <LoginForm/>
              )}/>
              <PrivateRoute loggedIn={this.state.loggedIn} path="/" Component={Paperbase} />
            </Switch>
          </main>
        </div>
      );
  } 
}

export default withRouter(App);
