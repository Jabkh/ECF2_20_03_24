import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slices/pokemonSlice";
import pokemonCartReducer from "./slices/pokemonCartSlice";

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonCart: pokemonCartReducer,
  },
});
