import React, { useState, useContext } from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Navbar.css";

function MenuBar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [dataInput, setDataInput] = useState("");

  const handleChange = (e) => {
    setDataInput(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDataInput("");
  };

  return (
    <Navbar
      className="color-nav"
      bg={isDarkMode ? "light" : "dark"}
      variant={isDarkMode ? "light" : "dark"}
    >
      <Navbar.Brand href="#home">Yellow Restaurant</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/categories">Food categories</Nav.Link>
        <Nav.Link href="/surprise-meal">Surprise Meal</Nav.Link>
        <Nav.Link href="/sign-up">Sign-Up</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/logout">Logout</Nav.Link>
      </Nav>
      <Form inline onSubmit={handleSubmit}>
        <FormControl
          type="text"
          placeholder="Search by ingredient"
          className="mr-sm-2"
          value={dataInput}
          onChange={handleChange}
        />

        <Link to={`/search/${dataInput}`}>
          <Button type="submit" variant="outline-success">
            🔍
          </Button>
        </Link>
      </Form>

      <Button type="submit" variant="outline-success" onClick={toggleTheme}>
        🎨
      </Button>
    </Navbar>
  );
}

export default MenuBar;
