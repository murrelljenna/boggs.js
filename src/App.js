import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contacts from './components/Contacts.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <Switch>
          <Route path='/contacts/' component={Contacts} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
