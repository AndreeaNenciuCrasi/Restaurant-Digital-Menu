import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import "../MealBrowsing/FoodCategories.css";

function OrderDetails({ name }) {
  const [user, setUser] = useState([]);
  const [listOfMeals, setListOfMeals] = useState([]);
  const { handleSubmit } = useForm();
  const userName = window.sessionStorage.getItem("User");
  const token = window.sessionStorage.getItem("token");

  useEffect(() => {
    async function getData() {
      const cartResponse = await axios.get(
        `http://localhost:8080/yellowrestaurant/api/v1/cart/mealsInCart/${name}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(cartResponse.data);
      setListOfMeals(cartResponse.data);
    }
    getData();
  }, [name, token]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `http://localhost:8080/yellowrestaurant/api/v1/user/view/${userName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data);
      setUser(response.data);
    }
    getData();
  }, [token, userName]);

  const getListOfMeals = (mapWithMeals) => {
    // console.log(mapWithMeals);
    let content = [];
    let meal = {};
    for (let [mealJSON, quantity] of Object.entries(mapWithMeals)) {
      meal = JSON.parse(mealJSON);
      content.push(
        <tr>
          <td>{meal.name}</td>
          <td>{quantity}</td>
          <td>{meal.price * quantity} $</td>
        </tr>
      );
    }

    return content;
  };

  const getTotalPrice = (mapWithMeals) => {
    let meal = {};
    let sum = 0;
    for (let [mealJSON, quantity] of Object.entries(mapWithMeals)) {
      meal = JSON.parse(mealJSON);
      sum += meal.price * quantity;
    }
    return sum;
  };

  const onSubmit = () => {
    const paymentRequest = {
      totalAmount: `${getTotalPrice(listOfMeals)}`,
      description: `OrderId${user.firstName}`,
    };
    doPayment(paymentRequest);
  };

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
          {listOfMeals && getListOfMeals(listOfMeals)}
          <tr style={{ color: "yellow" }}>
            <td>TOTAL PRICE:</td>
            <td colSpan="2">{listOfMeals && getTotalPrice(listOfMeals)} $</td>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <button className="btn btn-primary" type="submit">
          Proceeded with the payment
        </button>
      </form>
    </div>
  );
}

export default OrderDetails;

async function doPayment(params) {
  axios
    .post("http://localhost:8081/api/v1/payment", params)
    .then((response) => {
      if (response.status === 200) {
        // console.log(response);
        window.location.href =response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
