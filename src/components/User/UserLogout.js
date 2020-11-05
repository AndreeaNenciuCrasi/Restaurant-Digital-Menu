import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UserLogout() {
  const history = useHistory();
  useEffect(() => {
    async function logOut() {
      try {
        await axios.get("http://localhost:8080/auth/logout").then((resp) => {
          console.log(resp);
          window.sessionStorage.clear();
          history.push("/surprise-meal");
        });
      } catch (error) {
        history.push({ pathname: "/error", state: { detail: error.message } });
      }
    }
    logOut();
  }, []);

  return (
    <div>
      <h2>You are log out !</h2>
    </div>
  );
}

export default UserLogout;
