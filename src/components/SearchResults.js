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

              <a href="#" className="btn btn-primary">
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

export default SearchResults;
