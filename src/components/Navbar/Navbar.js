import React from "react";
import { Navbar, Nav, Link } from "react-bootstrap";

function MenuBar() {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">Restaurant Yellow</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/">Menu</Nav.Link>
        <Nav.Link href="/surprise-meal">Surprise Meal</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default MenuBar;
