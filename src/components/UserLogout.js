import React from "react";
import { Redirect } from "react-router";

export default function UserLogout() {
  sessionStorage.clear();
  alert("You have been logged out!");

  return (
    <div>
      <Redirect to="/" />
    </div>
  );
}
