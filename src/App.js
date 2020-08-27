import React from "react";

import "./App.css";
import Footer from "./components/Footer";
import MenuBar from "./components/Navbar/Navbar";
import FoodCategories from "./components/FoodCategories";
import { Switch, Route, Redirect } from "react-router-dom";
import SurpriseMeal from "./components/SurpriseMeal";
import MealListByCategory from "./components/MealListByCategory";
import SearchResults from "./components/SearchResults";
import FoodDetails from "./components/FoodDetails";
import PageContent from "./PageContent";
import { ThemeProvider } from "./contexts/ThemeContext";
import AllMeals from "./components/AllMeals";
import UserSignUp from "./components/UserSignUp";
import UserLogin from "./components/UserLogin";
import UserLogout from "./components/UserLogout";
import UserProfile from "./components/UserProfile";
import ShoppingCart from "./components/ShoppingCart";
import FavoriteMeals from "./components/FavoriteMeals";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <PageContent>
          <MenuBar />
          <div>
            <Switch>
              <Route path="/categories" exact component={FoodCategories} />
              <Route path="/" exact component={AllMeals} />
              <Route
                path="/categories/:name"
                render={(e) => (
                  <MealListByCategory name={e.match.params.name} />
                )}
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

              <Route path="/signup" exact component={UserSignUp} />
              <Route path="/login" exact component={UserLogin} />
              <Route path="/logout" exact component={UserLogout} />
              <Route path="/user-profile" exact component={UserProfile} />
              <Route path="/cart" exact component={ShoppingCart} />
              <Route path="/user-profile/favorites" exact component={FavoriteMeals} />
              <Redirect to="/" />
            </Switch>
          </div>
          <Footer />
        </PageContent>
      </ThemeProvider>
    </div>
  );
}

export default App;
