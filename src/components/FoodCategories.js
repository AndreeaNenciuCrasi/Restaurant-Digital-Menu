import React, { useState, useEffect } from "react";
import axios from "axios";

function FoodCategories() {
  const [foodCategories, setFoodCategories] = useState([]);
  const [showMoreDetails, setshowMoreDetails] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setFoodCategories(response.data.categories);
    }
    getData();
  }, []);

  const showMore = (e) => {
    e.preventDefault();
    let data = e.target;
    console.log(data);
    setshowMoreDetails(!showMoreDetails);
  };

  return (
    <div className="container">
      {foodCategories.map((item, i) => (
        <div
          className="card"
          style={{ width: "18rem", display: "inline-block" }}
          key={i}
        >
          <img
            className="card-img-top"
            src={item.strCategoryThumb}
            alt={item.strCategory}
          />
          <div className="card-body">
            <h5 className="card-title">{item.strCategory}</h5>
            <p className="card-text">
              {!showMoreDetails
                ? item.strCategoryDescription.substring(0, 100)
                : item.strCategoryDescription}{" "}
              <a href="#" value={i} onClick={showMore}>
                show more
              </a>
            </p>

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
