import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FavoriteMeals() {

  const username = window.sessionStorage.getItem("User");
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `http://localhost:8080/api/v2/user/${username}/favorites`
      );
      setFavoriteMeals(response.data);
      console.log(response.data);
    }
    getData();
  }, []);

  return (
    <div style={{marginBottom : "25rem"}}className="container FoodCategoriesContainer">
      <div style={{ "color": "white" }}><h3>Favorite meals</h3></div>
      {favoriteMeals.map((item,i) => (
        <div
          key={i}
          className="card FoodCategoriesCard"
          style={{ width: "18rem", display: "inline-block" }}
        >
          <img
            className="card-img-top cardImg"
            src={item.image}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{item.name.substring(0,20)}</h5>
            <Link to={`/food-details/${item.idMeal}`}>
              <button type="button" value="submit" className="btn btn-info">
                Info
              </button>{" "}
            </Link>
            <a href="#" onClick={() => handleClick(item)} className="btn btn-primary">
              Order
              </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function handleClick(mealToAddToCart) {
  const username = window.sessionStorage.getItem("User");
  const image = mealToAddToCart.image.replace(
    "https://www.themealdb.com/images/media/meals/",
    ""
  );
  fetch(
    `http://localhost:8080/api/v2/cart/${username}/meal/${mealToAddToCart.name}/tocart/${image}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealToAddToCart),
    }
  ).then((response) => {
    console.log(response);
  });
}

