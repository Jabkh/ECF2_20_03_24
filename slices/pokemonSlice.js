import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

// Action asynchrone pour récupérer la liste des pokemons
export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const response = await axios.get(BASE_URL);
    const data = await response.data.results;

    const pokemons = [];

    await Promise.all(
      data.map(async (pokemon) => {
        await axios.get(pokemon.url).then((response) => {
          pokemons.push(response.data);
        });
      })
    );

    return pokemons;
  }
);

// Action asynchrone pour récupérer les détails d'un pokemon spécifique
export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (url) => {
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  }
);

// Action asynchrone pour récupérer les types de pokemons
export const fetchType = createAsyncThunk("pokemon/fetchType", async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/type");
  const data = await response.data;

  return data.results;
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemons: [],
    pokedex: [],
    filteredPokemons: [],
    displayPokedex: false,
    types: [],
    darkMode: false,
  },
  reducers: {
    addPokedex: (state, action) => {
      state.pokedex.push(action.payload);
    },
    changeDisplayPokedex: (state) => {
      state.displayPokedex = !state.displayPokedex;
    },
    clearPokedex: (state) => {
      state.pokedex = [];
    },
    setFilteredPokemons: (state, action) => {
      state.filteredPokemons = action.payload;
    },
  },
  toggleDarkMode: (state) => {
    state.darkMode = !state.darkMode; 
  },
  extraReducers: (builder) => {
    builder
      // Gestion de l'état "pending" pour fetchPokemons
      .addCase(fetchPokemons.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // Gestion de l'état "fulfilled" pour fetchPokemons
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload;
        state.filteredPokemons = action.payload;
      })
      // Gestion de l'état "rejected" pour fetchPokemons
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchType.fulfilled, (state, action) => {
        state.types = action.payload;
      });
  },
});

export const {
  addPokedex,
  changeDisplayPokedex,
  clearPokedex,
  setFilteredPokemons,
  toggleDarkMode
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
