import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FavoriteMeals() {
  const username = window.sessionStorage.getItem("User");

  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [item, setItem] = useState([]);
  let mealList = [];

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `http://localhost:8080/api/v2/user/${username}/favorites`
      );
      setFavoriteMeals(response.data);
      console.log(response.data);
    }
    getData();

    // for (var favoriteMeal in favoriteMeals) {

    //   async function getMealData(favoriteMeal) {
    //     const response = await axios.get(
    //         `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favoriteMeal}`
    //     );
    //     setItem(response.data.meals[0]);
    //     mealList.push(response.data.meals[0]);

    //   }
    //   getMealData();

    // }
    async function getMealData() {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52874`
      );
      setItem(response.data.meals[0]);
    }
    getMealData();
    // mealList.push(item);
  }, []);

  mealList.push(item);
  // mealList.push(item);

  console.log(item);
  console.log(favoriteMeals);
  console.log(mealList);

  // favoriteMeals.forEach(async function (favoriteMeal) {
  //     const response = await axios.get(
  //         `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favoriteMeal}`
  //     );
  //     setItem(response.data.meals[0]);
  //     MealsList.push(response.data.meals[0]);
  //     // console.log(response.data.meals[0]);
  // });

  return (
    <div className="container FoodCategoriesContainer">
      {/* {MealsList.map((item) => ( */}
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
          <h5 className="card-title">{item.strMeal}</h5>
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
      {/* ))} */}
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
