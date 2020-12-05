import logo from "./logo.svg";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Contacts from "./components/Contacts.js";
import MainNavbar from "./components/MainNavbar.js";
import { DataType, EditingMode, SortingMode } from "ka-table/enums";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactsFunc = (props) => {
  return (
    <Contacts
      {...props}
      model={"contacts"}
      columns={[
        { key: "first_name", title: "First Name", dataType: DataType.String },
        { key: "last_name", title: "Last Name", dataType: DataType.String },
        { key: "address", title: "Address", dataType: DataType.String },
        {
          key: "unit_number",
          title: "Unit",
          dataType: DataType.String,
          style: { width: 50 },
        },
        {
          key: "email_address",
          isEditable: true,
          title: "Email Address",
          dataType: DataType.String,
        },
        { key: "editColumn", style: { width: 75 } },
      ]}
    />
  );
};

const BuildingsFunc = (props) => {
  return (
    <Contacts
      {...props}
      model={"buildings"}
      columns={[
        {
          key: "street_number",
          title: "Street Number",
          dataType: DataType.String,
        },
        { key: "street_name", title: "Street Name", dataType: DataType.String },
        { key: "postal_code", title: "Postal Code", dataType: DataType.String },
        { key: "editColumn", style: { width: 75 } },
      ]}
    />
  );
};

function App() {
  return (
    <div className="App">
      <main>
        <MainNavbar></MainNavbar>

        <Switch>
          <Route path="/contacts/" component={ContactsFunc} />
          <Route path="/buildings/" component={BuildingsFunc} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
