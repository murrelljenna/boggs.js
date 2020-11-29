import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contacts from './components/Contacts.js';
import MainNavbar from './components/MainNavbar.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <main>
        <MainNavbar></MainNavbar>

        <Switch>
          <Route path='/contacts/' component={Contacts} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
