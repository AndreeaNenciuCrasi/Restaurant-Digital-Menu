import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
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
  }, []);

  return (
    <div className="container FoodCategoriesContainer">
      <h1 style={{color : "white"}}>Cart</h1>
      {listOfMeals.map((item) =>
        <div className="card FoodCategoriesCard">
          <Card style={{ width: '18rem' }}>
            <Card.Img className="cardImg" variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                {item.price}$
        </Card.Text>
            </Card.Body>
          </Card>
        </div>

      )
      }
      <div>
        <p style={{ fontSize: "50px", color: "yellow" }}>
          TOTAL PRICE: {5 * listOfMeals.length}$
        </p>

      </div>
    </div>

  );
}

export default ShoppingCart;
