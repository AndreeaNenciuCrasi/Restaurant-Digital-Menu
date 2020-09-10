import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./FoodCategories.css";

function ShoppingCart() {
  const [cartId, setCartId] = useState(0);
  const [listOfMeals, setListOfMeals] = useState([]);
  const userName = window.sessionStorage.getItem("User");

  useEffect(() => {
    async function getData() {
      const cartResponse = await axios.get(
        `http://localhost:8080/api/v2/cart/view/${userName}`
      );
      setCartId(cartResponse.data);
      console.log(cartResponse.data + "cart id");
      const mealResponse = await axios.get(
        `http://localhost:8080/api/v2/cart/mealsInCart/${cartResponse.data}`
      );
      console.log(mealResponse.data);
      setListOfMeals(mealResponse.data);
    }
    getData();

    // async function getMealsList() {
    //   console.log(cartId);
    //   const response = await axios.get(
    //     `http://localhost:8080/api/v2/cart/mealsInCart/${cartId}`
    //   );
    //   setListOfMeals(response.data);
    //   console.log(response.data);
    // }
    // getMealsList();
  }, []);

  return (
    <div className="container FoodCategoriesContainer">
      <ul class="list-group">
        <li class="list-group-item active">Cart</li>
        {/* {Object.keys(cartList).map((key, index) => (
          <div class="card" style={{ width: "100%" }} key={index}>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">{key}</li>
              <li class="list-group-item">{cartList[key]} Qty</li>
              <li class="list-group-item">{5 * cartList[key]} USD</li>
            </ul>
          </div>
        ))}
        <li class="list-group-item">Total Price {totalPrice}</li> */}
      </ul>
    </div>
  );
}

export default ShoppingCart;
