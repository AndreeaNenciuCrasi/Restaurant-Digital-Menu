import React, { useState, useEffect } from "react";
import axios from "axios";

function FoodCategories() {
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      console.log(response.data.categories);
      setFoodCategories(response.data.categories);
    }
    getData();
  }, []);

  return (
    <div>
      {foodCategories.map((item, key) => (
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src={item.strCategoryThumb}
            alt={item.strCategory}
          />
          <div className="card-body">
            <h5 className="card-title">{item.strCategory}</h5>
            <p className="card-text">{item.strCategoryDescription}</p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodCategories;
