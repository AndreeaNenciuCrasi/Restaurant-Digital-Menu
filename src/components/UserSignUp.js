import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";

export default function UserSignUp() {
  const { register, handleSubmit } = useForm();
  const [toHome, setToHome] = useState();

  const onSubmit = (data) => {
    fetch(" http://localhost:8080/api/v2/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        setToHome(true);
      }
    });
  };

  return (
    <div>
      {toHome ? <Redirect to="/" /> : null}
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
          <h5 style={{ color: "blue" }}>Register account</h5>
          <div class="form-group">
            {/* <label for="First Name">First Name</label> */}
            <input
              name="firstName"
              placeholder="First name"
              ref={register}
              type="text"
              class="form-control"
              id="first-name"
            />
          </div>
          <div class="form-group">
            <input
              name="lastName"
              placeholder="Last name"
              ref={register}
              type="text"
              class="form-control"
              id="last-name"
            />
          </div>
          <div class="form-group">
            <input
              name="userName"
              placeholder="Username"
              ref={register}
              type="text"
              class="form-control"
              id="user-name"
            />
          </div>
          <div class="form-group">
            <input
              name="emailAddress"
              placeholder="Email Address"
              ref={register}
              type="text"
              class="form-control"
              id="email-address"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              ref={register}
              class="form-control"
              id="password"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              ref={register}
              class="form-control"
              id="confirm-password"
            />
          </div>
          <input type="submit" class="btn btn-primary" />
        </form>
      </div>
    </div>
  );
}
