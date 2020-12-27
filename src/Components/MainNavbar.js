import React from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import { NavLink } from "react-router-dom";

import './MainNavbar.css'

export default class MainNavbar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Navbar sticky="top" bg="light" expand="lg">
        <NavLink className="navbar-brand" exact to={"/"} activeClassName="active">Dashboard</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" exact to={"/contacts/"} activeClassName="active">Contacts</NavLink>
            <NavLink className="nav-link" exact to={"/buildings/"} activeClassName="active">Buildings</NavLink>
            <NavLink className="nav-link" exact to={"/organizers/"} activeClassName="active">Organizers</NavLink>
            <NavDropdown title="Other" id="basic-nav-dropdown">
              <NavLink className="dropdown-item" exact to={'/dnk/'} activeClassName="active">Do Not Knock</NavLink>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
