import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";
import "../MealBrowsing/FoodCategories.css";

function OrderDetails() {
  const [cartId, setCartId] = useState(0);
  const [listOfMeals, setListOfMeals] = useState([]);
  const userName = window.sessionStorage.getItem("User");

  useEffect(() => {
    async function getData() {
      const cartResponse = await axios.get(
        `http://localhost:8080/yellowrestaurant/api/v1/cart/view/${userName}`
      );
      setCartId(cartResponse.data);
      console.log(cartResponse.data + "cart id");
      const mealResponse = await axios.get(
        `http://localhost:8080/yellowrestaurant/api/v1/cart/mealsInCart/${cartResponse.data}`
      );
      console.log(mealResponse.data);
      setListOfMeals(mealResponse.data);
    }
    getData();
  }, []);
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
              <td>{item.price}</td>
            </tr>
          ))}
          <tr style={{ color: "yellow" }}>
            <td>TOTAL PRICE:</td>
            <td colSpan="2">{5 * listOfMeals.length} $</td>
          </tr>
          <tr>
            <td>NAME</td>
            <td colSpan="2"></td>
          </tr>
          <tr>
            <td>SHIPPING ADDRESS</td>
            <td colSpan="2"></td>
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
