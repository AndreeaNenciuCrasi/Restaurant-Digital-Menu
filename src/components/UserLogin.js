import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Redirect} from "react-router";

function UserLogin({ login }) {
    const [toHome, setToHome] = useState(false);
    const [userName, setUserName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setToHome(true);
        login(userName);
        console.log(userName);
        // fetch(" http://localhost:8080/api/v2/user", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(data),
        // }).then((res) => res.json());
    }

    // const handleChange = (userName) => {
    //     setUserName(userName);
    //     console.log(userName);
    // }

    return (
        <div>
        {toHome ? <Redirect to="/" /> : null}
        <div className="container-register" style={{ width: "38rem", marginTop: "50px", justifyContent : "center", display : "flex" }}>
            <form onSubmit={handleSubmit}>
            <h5 style = {{ color : "blue" }}>Login</h5>
            <div className="form-group">
                <input name="userName" placeholder="Username" type="text" class="form-control" id="user-name" onChange={e => setUserName(e.target.value)} value={userName} required="required" />
            </div>
            <div className="form-group">
                <input type="text" name="emailAddress" placeholder="Email Address" class="form-control" id="email-address" required="required"/>
            </div>
            <div className="form-group">
                <input type="password" name="password" placeholder="Password"  class="form-control" id="password" required="required" />
            </div>         
            <input type="submit" className="btn btn-primary"/>
            </form>
        </div>
        </div> 
    );
}

export default UserLogin;