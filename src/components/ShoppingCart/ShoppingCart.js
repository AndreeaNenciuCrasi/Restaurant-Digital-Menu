import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import "../MealBrowsing/FoodCategories.css";

function ShoppingCart() {
  const [cartId, setCartId] = useState(0);
  const [listOfMeals, setListOfMeals] = useState([]);
  const userName = window.sessionStorage.getItem("User");
  const userToken = window.sessionStorage.getItem("token");

  useEffect(() => {
    async function getData() {
      const cartResponse = await axios.get(
        `http://localhost:8080/yellowrestaurant/api/v1/cart/view/${userName}`
      , {headers:{
        'Authorization':`Bearer ${userToken}`
    }});
      setCartId(cartResponse.data);
      console.log(cartResponse.data + "cart id");
      const mealResponse = await axios.get(
        `http://localhost:8080/yellowrestaurant/api/v1/cart/mealsInCart/${cartResponse.data}`
      ,{headers:{
        'Authorization':`Bearer ${userToken}`
    }});
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
