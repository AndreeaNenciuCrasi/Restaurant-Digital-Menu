import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "./FoodDetails.css";
import { Modal, Button } from "react-bootstrap";

function FoodDetails({ id }) {
  const [foodDetails, setFoodDetails] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    <div className="container" style={{ width: "38rem", marginTop: "50px" }}>
      <div className="card">
        <div style={{ width: "35rem", margin: "0 auto", paddingTop: "10px" }}>
          <img
            className="card-img-top"
            src={foodDetails.strMealThumb}
            alt="Card image cap"
          />
        </div>
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

          <>
            <Button variant="link" onClick={handleShow}>
              Recipe
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Recipe</Modal.Title>
              </Modal.Header>
              <Modal.Body>{foodDetails.strInstructions}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
