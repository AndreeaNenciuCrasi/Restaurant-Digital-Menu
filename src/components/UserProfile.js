import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {FaUser} from "react-icons/fa";
import "../UserProfile.css";
import { Button, Modal } from "react-bootstrap";
import { Redirect } from "react-router";

export default function UserProfile() {

    const { register, handleSubmit } = useForm();

    const userName = window.sessionStorage.getItem("User");

    console.log(userName);

    const [user, setUser] = useState([]);
    const [toHome, setToHome] = useState();
    const [show, setShow] = useState(false);

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

    
    const onSubmit = (data) => {
        console.log(data);
        fetch(` http://localhost:8080/api/v2/user/${userName}/edit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((response) => {
          if (response.status === 200) {
            handleShow();          
          }
        });
    }

    const handleClose = () => { 
        setShow(false);
        setToHome(true); }

    const handleShow = () => setShow(true);

    return (
        <div>{toHome ? <Redirect to="/" /> : null}
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
                            <h6 className="text-right">Edit Profile</h6>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mt-2">
                            <div className="col-md-6"><input type="text" className="form-control" placeholder={user.firstName} ref={register} name="firstName"/></div>
                            <div className="col-md-6"><input type="text" className="form-control" placeholder={user.lastName} ref={register} name="lastName"/></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><input type="text" className="form-control" placeholder={user.emailAddress} ref={register} name="emailAddress"/></div>
                            <div className="col-md-6"><input type="text" className="form-control" value={user.userName} ref={register} name="userName"/></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><input type="text" className="form-control" placeholder={user.deliveryAddress ? user.deliveryAddress : "Address"} ref={register} name="deliveryAddress"/></div>
                            <div className="col-md-6"><input type="text" className="form-control" placeholder={user.phoneNumber ? user.phoneNumber : "Phone Number"} ref={register} name="phoneNumber"/></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><input type="password" className="form-control" value={user.password} ref={register} name="password"/></div>
                            <div className="col-md-6"><input type="password" className="form-control" value={user.password}/></div>
                        </div>
                        <div className="mt-5 text-right"><button className="btn btn-primary profile-button" type="submit">Save Profile</button></div>
                        </form>
                    </div>
                </div>
            </div>
            <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>User details updated</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
          </Button>
            </Modal.Footer>
          </Modal>
        </>
        </div>
        </div> 
    );
}