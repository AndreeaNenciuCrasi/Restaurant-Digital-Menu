import React from "react";

import "./App.css";
import MenuBar from "./components/Navbar/Navbar";
import FoodCategories from "./components/FoodCategories";

function App() {
  return (
    <div className="App">
      <MenuBar />
      <div>
        <FoodCategories />
      </div>
    </div>
  );
}

export default App;
