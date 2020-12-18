import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainNavbar from "./Components/MainNavbar.js";
import { ContactsTable, BuildingsTable } from "./Components/Tables.js";
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import { Component } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.headers.common['Content-Type'] = 'application/json';

class App extends Component {
  constructor(props) {
    super(props);
    //localStorage.removeItem('token');
    console.log(`Token found in local storage? ${localStorage.getItem('token') ? true : false}`);
    console.log(`Token found: ${localStorage.getItem('token')}`);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
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
    axios.post('http://localhost:8000/token-auth/', data)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        this.setState({
          logged_in: true,
          error: false,
          errorMessage: "",
          displayed_form: '',
          username: res.data.user.username
        });
      })
      .catch(err => {
        this.setState({
          logged_in: false,
          error: true,
          errorMessage: 'Authentication failed',
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  render() {
    if (!this.state.logged_in) {
      return (
        <div className="App">
          <main>
            <LoginForm error={this.state.error} errorMessage={this.state.errorMessage} handle_login={this.handle_login}/>
          </main>
        </div>
      );
    }

      return (
        <div className="App">
          <main>
            <MainNavbar></MainNavbar>
            <Switch>
              <Route path="/contacts/" component={ContactsTable} />
              <Route path="/buildings/" component={BuildingsTable} />
            </Switch>
          </main>
        </div>
      );
  } 
}

export default App;
