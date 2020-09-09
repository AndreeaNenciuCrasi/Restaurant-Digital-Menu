import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import "./FoodCategories.css";

function MealListByCategory({ name }) {
  const [foodListCategories, setFoodListCategories] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
      );
      setFoodListCategories(response.data.meals);
    }
    getData();
  }, [name]);

  return (
    <div className="container FoodCategoriesContainer">
      {foodListCategories.map((item) => (
        <div
          key={item.strMeal}
          className="card FoodCategoriesCard"
          style={{ width: "18rem", display: "inline-block" }}
        >
          <img
            className="card-img-top cardImg"
            src={item.strMealThumb}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{item.strMeal.substring(0, 25)}</h5>
            <button type="button" onClick={() => faveClick(item)}>
              <h5>
                <FaHeart style={{ color: "blue" }} />
              </h5>
            </button>{" "}
            <Link to={`/food-details/${item.idMeal}`}>
              <button type="button" value="submit" className="btn btn-info">
                Info
              </button>{" "}
            </Link>
            <a
              href="#"
              onClick={() => handleClick(item.strMeal)}
              className="btn btn-primary"
            >
              Order
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function handleClick(data) {
  alert("Meal added to your shopping cart!");
  fetch(`http://localhost:8080/api/v2/cart/${data}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => {
    console.log(response);
  });
}

function faveClick(favoriteMeal) {
  const username = window.sessionStorage.getItem("User");
  alert("Meal added to your favorites!");
  fetch(
    `http://localhost:8080/api/v2/user/${username}/favorites/${favoriteMeal.idMeal}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favoriteMeal),
    }
  ).then((response) => {
    console.log(response);
  });
}

export default MealListByCategory;
