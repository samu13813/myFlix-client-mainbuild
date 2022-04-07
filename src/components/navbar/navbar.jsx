import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import './navbar.scss';

class NavbarComp extends React.Component {

  render() {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    return (
      <div>
        <Navbar bg="light" variant="light" expand="md">
            <Navbar.Brand href="/">My Flix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link onClick={() => { onLoggedOut(); }}>Log Out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavbarComp;
