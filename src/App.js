import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./Components/PrivateRoute.js"
import { withRouter } from "react-router";
import LoginForm from './Components/LoginForm';
import React, { Component } from "react";

import Paperbase from "./TemplateApp.js"

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div className="App">
          <main>
            <Switch>
              <Route path="/login/" render={() => (
                <LoginForm/>
              )}/>

              <PrivateRoute loggedIn={true} path="/" Component={Paperbase} />
            </Switch>
          </main>
        </div>
      );
  } 
}

export default withRouter(App);
