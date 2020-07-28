import React from "react";
import { Navbar, Nav, Link } from "react-bootstrap";

function MenuBar() {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">Restaurant Yellow</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Menu22</Nav.Link>
        <Nav.Link href="#pricing">222</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default MenuBar;
