import { Route, Redirect, Switch } from "react-router-dom";
import { PrivateRoute } from "./Components/PrivateRoute.js"
import { withRouter } from "react-router";
import MainNavbar from "./Components/MainNavbar.js";
import { ContactsTable, BuildingsTable, OrganizersTable, dnkTable } from "./Components/Tables.js";
import LoginForm from './Components/LoginForm';
import React, { Component } from "react";
import api from "./utils/api.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Paperbase from "./TemplateApp.js"

const apiContext = React.createContext({});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: '',
      currentUser: {},
      loggedIn: false,
    };
  }

  handle_login = (e, data) => {
    console.log("HARDAR");
    e.preventDefault();
    api.post('http://localhost:8000/token-auth/', data)
      .then(res => {
        localStorage.setItem('token', res.data.access);
        console.log(this.state.loggedIn);
        this.setState({
          loggedIn: true,
          error: false,
          errorMessage: "",
          token: res.data.token,
          currentUser: res.data.user,
        });
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loggedIn: false,
          error: true,
          errorMessage: 'Authentication failed',
        });
      });
  };

  render() {

      return (
        <div className="App">
          <main>
            <Switch>
              {console.log(`--- ${this.state.loggedIn}`)}
              <Route path="/login/" render={(props) => (
                <LoginForm error={this.state.error} errorMessage={this.state.errorMessage} handle_login={this.handle_login}/>
              )}/>
              <PrivateRoute loggedIn={this.state.loggedIn} path="/" Component={Paperbase} />
              <Route path="/dnk/" component={dnkTable} />*/}
            </Switch>
          </main>
        </div>
      );
  } 
}

export default withRouter(App);
