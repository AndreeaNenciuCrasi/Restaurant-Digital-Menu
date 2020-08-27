import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./FoodCategories.css";

function ShoppingCart() {
  const [cartList, setCartList] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "http://localhost:8080/api/v2/cart/list"
      );
      setCartList(response.data);
      console.log(response.data);
    }
    getData();

    async function getPrice() {
      const response = await axios.get(
        "http://localhost:8080/api/v2/cart/list/price"
      );
      setTotalPrice(response.data);
      console.log(response.data);
    }
    getPrice();
  }, []);

  function calcTotalPrice() {
    const sum = 0;
    Object.keys(cartList).map((key, index) => (sum += 5 * cartList[key]));
    setTotalPrice(sum);
    return sum;
  }

  return (
    <div className="container FoodCategoriesContainer">
      <ul class="list-group">
        <li class="list-group-item active">Cart</li>
        {Object.keys(cartList).map((key, index) => (
          <div class="card" style={{ width: "100%" }} key={index}>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">{key}</li>
              <li class="list-group-item">{cartList[key]} Qty</li>
              <li class="list-group-item">{5 * cartList[key]} USD</li>
            </ul>
          </div>
        ))}
        <li class="list-group-item">Total Price {totalPrice}</li>
      </ul>
    </div>
  );
}

export default ShoppingCart;
