import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import MainNavbar from "./Components/MainNavbar.js";
import { ContactsTable, BuildingsTable } from "./Components/Tables.js";
import LoginForm from './Components/LoginForm';
import { Component } from "react";
import api from "./utils/api.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem('token');
    this.state = {
      displayed_form: '',
      username: '',
      error: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    api.post('http://localhost:8000/token-auth/', data)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        this.setState({
          logged_in: true,
          error: false,
          errorMessage: "",
          displayed_form: '',
          username: res.data.user.username
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
            </Switch>
          </main>
        </div>
      );
  } 
}

export default withRouter(App);
