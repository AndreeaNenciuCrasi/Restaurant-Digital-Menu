import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesome } from "react-icons/fa";
import {FaUser} from "react-icons/fa";
import "../UserProfile.css";

export default function UserProfile() {

    const userName = window.sessionStorage.getItem("User");

    console.log(userName);

    const [user, setUser] = useState([]);

    useEffect(() => {
        async function getData() {
          const response = await axios.get(
            `http://localhost:8080/api/v2/user/view/${userName}`
          );
          setUser(response.data);
          console.log(response.data)
        }
        getData();  
      }, []);

    return (
        <div className="container rounded bg-white mt-5">
            <div className="row">
                <div className="col-md-4 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <h1>
                            <FaUser />
                        </h1>
                        <span className="font-weight-bold">{user.firstName}  {user.lastName}</span>
                        <span className="text-black-50">{user.emailAddress}</span>
                        <Link to = "/user-profile/favorites">
                            <button className="btn btn-primary profile-button">Favorite meals</button>
                        </Link>
                    </div>                   
                </div>
                <div className="col-md-8">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex flex-row align-items-center back">
                                <Link to= "/">
                                    <button className="btn btn-primary profile-button">
                                        Back to home
                                    </button>
                                </Link>
                            </div>
                            <h6 className="text-right">Profile</h6>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><input type="text" className="form-control" value={user.firstName}/></div>
                            <div className="col-md-6"><input type="text" className="form-control" value={user.lastName}/></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><input type="text" className="form-control" value={user.emailAddress}/></div>
                            <div className="col-md-6"><input type="text" className="form-control" value={user.userName}/></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><input type="text" className="form-control" placeholder="Address"/></div>
                            <div className="col-md-6"><input type="text" className="form-control" placeholder="Phone number"/></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><input type="password" className="form-control" value={user.password}/></div>
                            <div className="col-md-6"><input type="password" className="form-control" value={user.password}/></div>
                        </div>
                        <div className="mt-5 text-right"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}