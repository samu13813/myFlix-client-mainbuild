import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { connect } from 'react-redux';
import './navbar.scss';

let mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return {
    user: state.user,
    movies: state.movies,
    visibilityFilter
  }
}

function NavbarComp({visibilityFilter}) {
  
  let user = localStorage.getItem('user');

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md" >
          <Navbar.Brand href="/">MY FLIX</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link onClick={() => { onLoggedOut(); }}>Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav.Item>
              <VisibilityFilterInput visibilityFilter={visibilityFilter} />
          </Nav.Item>
      </Navbar>
    </div>
  )
};

export default connect(mapStateToProps)(NavbarComp);
