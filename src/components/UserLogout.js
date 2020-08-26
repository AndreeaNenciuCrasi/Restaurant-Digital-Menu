import React from "react";
import { Redirect } from "react-router";

export default function UserLogout() {
  sessionStorage.clear();

  return (
    <div>
      <Redirect to="/" />
    </div>
  );
}
