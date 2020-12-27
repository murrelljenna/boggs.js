import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import MainNavbar from "./Components/MainNavbar.js";
import { ContactsTable, BuildingsTable, OrganizersTable, dnkTable } from "./Components/Tables.js";
import LoginForm from './Components/LoginForm';
import { Component } from "react";
import api from "./utils/api.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: '',
    };
  }

  handle_login = (e, data) => {
    e.preventDefault();
    api.post('http://localhost:8000/token-auth/', data)
      .then(res => {
        localStorage.setItem('token', res.data.access);
        this.setState({
          logged_in: true,
          error: false,
          errorMessage: "",
        });
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          logged_in: false,
          error: true,
          errorMessage: 'Authentication failed',
        });
      });
  };

  render() {
      return (
        <div className="App">
          <main>
            <MainNavbar></MainNavbar>
            <Switch>
              <Route path="/login/" render={(props) => (
                <LoginForm error={this.state.error} errorMessage={this.state.errorMessage} handle_login={this.handle_login}/>
              )}/>
              <Route path="/contacts/" component={ContactsTable} />
              <Route path="/buildings/" component={BuildingsTable} />
              <Route path="/organizers/" component={OrganizersTable} />
              <Route path="/dnk/" component={dnkTable} />
            </Switch>
          </main>
        </div>
      );
  } 
}

export default withRouter(App);
