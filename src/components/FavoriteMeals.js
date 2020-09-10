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
    <div className="container FoodCategoriesContainer">
      <div style = {{ "color" : "white"}}>Favorite meals</div>
      {favoriteMeals.map(item => (
        <div
            // key={key}
            className="card FoodCategoriesCard"
            style={{ width: "18rem", display: "inline-block" }}
          >
            <img
            className="card-img-top cardImg"
            src={item.image}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            {/* <Link to={`/food-details/${key}`}>
              <button type="button" value="submit" className="btn btn-info">
                Info
              </button>{" "}
            </Link> */}
            <a
              href="#"
              onClick={() => handleClick(item.name)}
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

