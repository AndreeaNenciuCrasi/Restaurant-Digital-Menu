import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";

export default function UserLogin() {
  const { register, handleSubmit } = useForm();
  const [userLogin, setUserLogin] = useState(false);

  const onSubmit = (data) => {
    let promiseA = loginUser(data);
    promiseA.then(function (result) {
      if (result) {
        setUserLogin(true);
        window.sessionStorage.setItem("User", data.userName);
        creatCart(data.userName);
        alert("You are login Bon Appetit !");
      } else {
        alert("User or password wrong");
      }
    });
  };

  return (
    <div>
      {userLogin && <Redirect to="/" />}
      <div
        className="container-register"
        style={{
          width: "38rem",
          marginTop: "50px",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h5 style={{ color: "blue" }}>Login</h5>
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
