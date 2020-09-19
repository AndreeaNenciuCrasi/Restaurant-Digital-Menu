import React, { useState, useEffect } from "react";
import axios from "axios";

function SurpriseMeal() {
  const [surpriseMeal, setSurpriseMeal] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setSurpriseMeal(response.data.meals[0]);
    }
    getData();
  }, []);

  console.log(surpriseMeal);
  return (
    <div className="container" style={{ width: "38rem", marginTop: "50px" }}>
      <div className="card">
        <div style={{ width: "98%", margin: "0 auto", paddingTop: "10px" }}>
          <img
            className="card-img-top"
            src={surpriseMeal.strMealThumb}
            alt="Card image cap"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{surpriseMeal.strMeal}</h5>
          <p className="card-text">
            Main ingredientes: {surpriseMeal.strIngredient1},{" "}
            {surpriseMeal.strIngredient2}, {surpriseMeal.strIngredient3}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Area: {surpriseMeal.strArea}</li>
          <li className="list-group-item">
            Category: {surpriseMeal.strCategory}
          </li>
          {surpriseMeal.strTags && (
            <li className="list-group-item">Tags: {surpriseMeal.strTags}</li>
          )}
        </ul>
        <div className="card-body">
          {surpriseMeal.strYoutube && (
            <a href={surpriseMeal.strYoutube} className="card-link">
              Youtube
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default SurpriseMeal;
