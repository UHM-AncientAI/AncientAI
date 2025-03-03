import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar id="navbar" fluid="true" expand="lg">
      <Container>
        <Navbar.Brand id="navbar-header" as={NavLink} to="/">
          <h2>Ancient AI</h2>
        </Navbar.Brand>
        <Navbar.Toggle id="navbar-toggle" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id="add-stuff-nav" as={NavLink} to="/uploadfile" key="add" style={{ color: '#A9C0E8' }}>Upload</Nav.Link>,
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/database" key="list" style={{ color: '#A9C0E8' }}>Database</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin" style={{ color: '#A9C0E8' }} />
            ) : ''}
          </Nav>
          <Nav id="navbar" className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login" style={{ color: '#A9C0E8' }}>
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin" style={{ color: '#14224A' }}>
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup" style={{ color: '#14224A' }}>
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser} style={{ color: '#14224A' }}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
