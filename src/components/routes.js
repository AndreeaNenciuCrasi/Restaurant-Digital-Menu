import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import PokemonDetails from "./PokemonDetails";
import PokemonList from "./PokemonList";
import TypeList from "./TypeList";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/pokemons" render={() => <PokemonList />} />
      <Route exact path="/types" render={() => <TypeList />} />
      <Route
        exact
        path="/pokemons/:name"
        render={(content) => (
          <PokemonDetails name={content.match.params.name} />
        )}
      />
      <Redirect to="/pokemons" />
    </Switch>
  );
}
