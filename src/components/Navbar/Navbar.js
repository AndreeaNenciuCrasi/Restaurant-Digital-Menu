import React, { useState } from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
function MenuBar() {
  const [dataInput, setDataInput] = useState("");

  const handleChange = (e) => {
    setDataInput(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDataInput("");
  };

  console.log(dataInput);
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="#home">Restaurant Yellow</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/">Menu</Nav.Link>
        <Nav.Link href="/surprise-meal">Surprise Meal</Nav.Link>
      </Nav>
      <Form inline onSubmit={handleSubmit}>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={dataInput}
          onChange={handleChange}
        />

        <Link to={`/search/${dataInput}`}>
          <Button type="submit" variant="outline-success">
            Search by ingredient
          </Button>
        </Link>
      </Form>
    </Navbar>
  );
}

export default MenuBar;
