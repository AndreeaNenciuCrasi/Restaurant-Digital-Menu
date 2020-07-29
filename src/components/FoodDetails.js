import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";

function FoodDetails({ id }) {
  const [foodDetails, setFoodDetails] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      setFoodDetails(response.data.meals[0]);
    }
    getData();
  }, [id]);

  return (
    <div className="container">
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={foodDetails.strMealThumb}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{foodDetails.strMeal}</h5>
          <p className="card-text">
            Main ingredientes: {foodDetails.strIngredient1},{" "}
            {foodDetails.strIngredient2}, {foodDetails.strIngredient3}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Area: {foodDetails.strArea}</li>
          <li className="list-group-item">
            Category: {foodDetails.strCategory}
          </li>
          {foodDetails.strTags && (
            <li className="list-group-item">Tags: {foodDetails.strTags}</li>
          )}
        </ul>
        <div className="card-body">
          {foodDetails.strYoutube && (
            <a href={foodDetails.strYoutube} className="card-link">
              Youtube
            </a>
          )}

          <Popup
            className="card-link"
            trigger={
              <a href="#" className="card-link">
                {" "}
                Recipe
              </a>
            }
            position="right center"
          >
            <div>{foodDetails.strInstructions}</div>
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
