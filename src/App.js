import React from "react";

import "./App.css";
import MenuBar from "./components/Navbar/Navbar";
import FoodCategories from "./components/FoodCategories";
import { Switch, Route, BroswerRoute } from "react-router-dom";
import SurpriseMeal from "./components/SurpriseMeal";

function App() {
  return (
    <div className="App">
      <MenuBar />
      <div>
        <Switch>
          <Route path="/" exact component={FoodCategories} />
          <Route path="/surprise-meal" exact component={SurpriseMeal} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
