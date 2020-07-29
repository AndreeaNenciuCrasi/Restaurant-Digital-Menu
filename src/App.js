import React from "react";

import "./App.css";
import MenuBar from "./components/Navbar/Navbar";
import FoodCategories from "./components/FoodCategories";
import { Switch, Route, Redirect } from "react-router-dom";
import SurpriseMeal from "./components/SurpriseMeal";
import MealListByCategory from "./components/MealListByCategory";
import SearchResults from "./components/SearchResults";
import FoodDetails from "./components/FoodDetails";

function App() {
  return (
    <div className="App">
      <MenuBar />
      <div>
        <Switch>
          <Route path="/" exact component={FoodCategories} />
          <Route
            path="/categories/:name"
            render={(e) => <MealListByCategory name={e.match.params.name} />}
          />
          <Route
            path="/search/:name"
            render={(e) => <SearchResults name={e.match.params.name} />}
          />
          <Route
            path="/food-details/:id"
            render={(e) => <FoodDetails id={e.match.params.id} />}
          />
          <Route path="/surprise-meal" exact component={SurpriseMeal} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
