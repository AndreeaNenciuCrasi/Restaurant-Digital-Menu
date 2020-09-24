import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../MealBrowsing/FoodCategories.css";

function OrderDetails({ name }) {
  const [user, setUser] = useState([]);
  const [listOfMeals, setListOfMeals] = useState([]);
  const userName = window.sessionStorage.getItem("User");

  useEffect(() => {
    async function getData() {
      //   const getUser = await axios.get(
      //     `http://localhost:8080/yellowrestaurant/api/v1/user/view/${userName}`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${userToken}`,
      //       },
      //     }
      //   );
      //   setUser(getUser);
      //   console.log(getUser + " user");
      const cartResponse = await axios.get(
        `http://localhost:8080/yellowrestaurant/api/v1/cart/mealsInCart/${name}`
      );
      console.log(cartResponse.data);
      setListOfMeals(cartResponse.data);
    }
    getData();
  }, [name]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `http://localhost:8080/yellowrestaurant/api/v1/user/view/${userName}`
      );
      setUser(response.data);
      console.log(response.data);
    }
    getData();
  }, [userName]);
  return (
    <div
      className="container FoodCategoriesContainer"
      style={{ marginBottom: "40rem" }}
    >
      <h1 style={{ color: "white" }}>Order Details</h1>

      <Table striped bordered hover style={{ color: "white" }}>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {listOfMeals.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>1</td>
              <td>{item.price} $</td>
            </tr>
          ))}
          <tr style={{ color: "yellow" }}>
            <td>TOTAL PRICE:</td>
            <td colSpan="2">{5 * listOfMeals.length} $</td>
          </tr>
          <tr>
            <td>NAME</td>
            <td colSpan="2">
              {user.firstName} {user.lastName}
            </td>
          </tr>
          <tr>
            <td>PHONE NUMBER</td>
            <td colSpan="2">
              {user.phoneNumber ? (
                user.phoneNumber
              ) : (
                <Link to={`/user-profile`}>Please add Phone Number</Link>
              )}
            </td>
          </tr>
          <tr>
            <td>EMAIL ADDRESS</td>
            <td colSpan="2">{user.emailAddress}</td>
          </tr>
          <tr>
            <td>SHIPPING ADDRESS</td>
            <td colSpan="2">
              {user.deliveryAddress ? (
                user.deliveryAddress
              ) : (
                <Link to={`/user-profile`}>Please add Shipping Address</Link>
              )}
            </td>
          </tr>
        </tbody>
      </Table>

      <a href="#" className="btn btn-primary">
        PayPal
      </a>
    </div>
  );
}

export default OrderDetails;
