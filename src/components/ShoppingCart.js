import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./FoodCategories.css";

function ShoppingCart() {
  const [cartList, setCartList] = useState({});

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "http://localhost:8080/api/v2/cart/list"
      );
      setCartList(response.data);
      console.log(response.data);
    }
    getData();
  }, []);

  return <div className="container FoodCategoriesContainer"></div>;
}

export default ShoppingCart;
