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
      console.log(response.data.meals);
    }
    getData();
  }, [name]);

  return (
    <div className="container FoodCategoriesContainer">
      {foodListCategories.map((item) => (
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
            <button type="button" value="submit">
              <h5 >
                <FaHeart style = {{ "color" : "blue" }}/>
              </h5>
            </button>{" "}
            <Link to={`/food-details/${item.idMeal}`}>
              <button type="button" value="submit" className="btn btn-info">
                Info
              </button>{" "}
            </Link>
            <a href="#" className="btn btn-primary">
              Order
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MealListByCategory;
