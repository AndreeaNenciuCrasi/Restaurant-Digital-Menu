import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { Button, Modal } from "react-bootstrap";
import "./UserLogin.css";


export default function UserLogin() {
  const { register, handleSubmit } = useForm();
  const [userLogin, setUserLogin] = useState(false);
  // Pop-up Alert
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("")


  const onSubmit = (data) => {
    let promiseA = loginUser(data);
    promiseA.then(function (result) {
      if (result) {
        setUserLogin(true);
        window.sessionStorage.setItem("User", data.userName);
        creatCart(data.userName);
        setModalMessage("You are logged in!\nBon Appetit !")
        handleShow();
      } else {
        setModalMessage("Username or Password is incorrect");
        handleShow();

      }
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="LoginContainer">
      <div>
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
          </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
      {userLogin && <Redirect to="/" />}
      <div
        className="   LoginContainer "
        style={{
          width: "38rem",
          marginTop: "50px",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h5 style={{ color: "white" }}>Login</h5>
          <div className="form-group">
            <input
              name="userName"
              placeholder="Username"
              ref={register}
              type="text"
              class="form-control"
              id="user-name"
              required="required"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              ref={register}
              placeholder="Password"
              class="form-control"
              id="password"
              required="required"
            />
          </div>
          <input type="submit" className="btn btn-primary" />
        </form>
      </div>

    </div>
  );
}

async function creatCart(data) {
  fetch("http://localhost:8080/api/v2/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => {
    console.log(response);
  });
}

async function loginUser(data) {
  let responseLogin = await fetch("http://localhost:8080/api/v2/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  return responseLogin;
}
