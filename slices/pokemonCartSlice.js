import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Création du slice pour le panier de Pokémon
const pokemonCartSlice = createSlice({
  name: 'pokemonCart', // Nom du slice
  initialState: {
    cart: [], // Liste des Pokémon dans le panier
    isDarkMode: false, // Mode sombre avec redux non utilisée pour le moment
  },
  reducers: {
    // Action pour ajouter un Pokémon au panier
    addToCart: (state, action) => {
      state.cart.push(action.payload); // Ajoute le Pokémon à la liste du panier
    },
    // Action pour supprimer un Pokémon du panier
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(pokemon => pokemon.id !== action.payload.id); // Supprime le Pokémon du panier
    },
    // Action pour vider le panier
    clearCart: (state) => {
      state.cart = []; // Vide la liste du panier
    },
    // Action pour basculer le mode sombre
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode; // Inverse l'état du mode sombre
    },
    updateCart: (state, action) => {
        state.cart = action.payload;
      },
  },
});

// Export des actions du slice
export const { addToCart, removeFromCart, clearCart, toggleDarkMode,updateCart} = pokemonCartSlice.actions;
// Export du réducteur du slice
export default pokemonCartSlice.reducer;
