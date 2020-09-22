import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FoodCategories.css";

function SearchResults({ name }) {
  const [foodListSearch, setFoodListSearch] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
      );
      setFoodListSearch(response.data.meals);
      console.log(response.data.meals);
    }
    getData();
  }, [name]);

  return (
    <div className="container FoodCategoriesContainer">
      {foodListSearch !== null ? (
        foodListSearch.map((item) => (
          <div
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

              <a href="#" onClick={() => handleClick(item)} className="btn btn-primary">
                Order
              </a>
            </div>
          </div>
        ))
      ) : (
        <h2>No results found</h2>
      )}
    </div>
  );
}

function handleClick(mealToAddToCart) {
  // alert("Meal added to your shopping cart!");
  const username = window.sessionStorage.getItem("User");
  const userToken = window.sessionStorage.getItem("token")
  const image = mealToAddToCart.strMealThumb.replace(
    "https://www.themealdb.com/images/media/meals/",
    ""
  );
  fetch(
    `http://localhost:8080/yellowrestaurant/api/v1/cart/${username}/meal/${mealToAddToCart.strMeal}/tocart/${image}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json","Authoriation":`Bearer ${userToken}`
      },
      body: JSON.stringify(mealToAddToCart),
    }
  ).then((response) => {
    console.log(response);
  });
}

export default SearchResults;
