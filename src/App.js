import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainNavbar from "./Components/MainNavbar.js";
import { ContactsTable, BuildingsTable } from "./Components/Tables.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
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

export default App;
