import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";

export default function UserLogin() {
  const { register, handleSubmit } = useForm();
  //   const [userName, setUserName] = useState("");

  const onSubmit = (data) => {
    console.log(data.userName);
    //verifca daca este user asta
    // daca exista face asta de jos daca nu altceva
    window.sessionStorage.setItem("User", data.userName);

    creatCart(data.userName);
  };

  return (
    <div>
      {window.sessionStorage.getItem("User") && <Redirect to="/" />}
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
              //   onChange={(e) => setUserName(e.target.value)}
              //   value={userName}
              required="required"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="emailAddress"
              placeholder="Email Address"
              ref={register}
              class="form-control"
              id="email-address"
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

function creatCart(data) {
  fetch("http://localhost:8080/api/v2/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => {
    console.log(response);
  });
}
