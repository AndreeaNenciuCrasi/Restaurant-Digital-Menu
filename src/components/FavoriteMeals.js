import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FavoriteMeals() {

  const username = window.sessionStorage.getItem("User");

  const [favoriteMeals, setFavoriteMeals] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `http://localhost:8080/api/v2/user/view/${username}`
      );
      setFavoriteMeals(response.data.favoritesMap);
      console.log(response.data.favoritesMap);
    }
    getData();
  }, []);

  return (
    <div className="container FoodCategoriesContainer">
      <div style = {{ "color" : "white"}}>Favorite meals</div>
      {Object.keys(favoriteMeals).map((key) => (
        <div
            key={key}
            className="card FoodCategoriesCard"
            style={{ width: "18rem", display: "inline-block" }}
          >
            <img
            className="card-img-top cardImg"
            src={favoriteMeals[key][0]}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{favoriteMeals[key][1]}</h5>
            <Link to={`/food-details/${key}`}>
              <button type="button" value="submit" className="btn btn-info">
                Info
              </button>{" "}
            </Link>
            <a
              href="#"
              onClick={() => handleClick(favoriteMeals[key][1])}
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

