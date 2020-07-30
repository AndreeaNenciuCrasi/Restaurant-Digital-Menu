import React, { useState, useEffect } from "react";
import axios from "axios";

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

  console.log(foodListSearch);

  return (
    <div>
      {foodListSearch !== null ? (
        foodListSearch.map((item) => (
          <div
            className="card"
            style={{ width: "18rem", display: "inline-block" }}
          >
            <img
              className="card-img-top"
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