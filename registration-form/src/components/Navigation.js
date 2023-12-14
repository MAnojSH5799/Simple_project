import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
  <Navbar.Brand as={Link} to="/" style={{ color: 'white' }}>
    Simple Project
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarNav" />
  <Navbar.Collapse id="navbarNav">
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/registration" activeClassName="active" exact style={{ color: 'white' }}>
        Registration
      </Nav.Link>
      <Nav.Link as={Link} to="/login" activeClassName="active" style={{ color: 'white' }}>
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/allUser" activeClassName="active" style={{ color: 'white' }}>
        All Users
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

  );
};

export default Navigation;
