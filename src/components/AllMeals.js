import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FoodCategories.css";

function AllMeals() {
  const [allMeals, setAllMeals] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?f=b"
      );
      setAllMeals(response.data.meals);
      console.log(response.data.meals);
    }
    getData();
    }, []);

    return (
        <div className="container FoodCategoriesContainer">
      {allMeals.map((item) => (
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
            <h5 className="card-title">{item.strMeal}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}


   
export default AllMeals;