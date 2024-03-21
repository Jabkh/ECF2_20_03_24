import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons } from '../slices/pokemonSlice';
import { addToCart } from '../slices/pokemonCartSlice';
import PokemonCard from './PokemonCard';


const PokeList = ({ navigation }) => {
  const dispatch = useDispatch(); // Initialisation du dispatch pour envoyer des actions au store
  const pokemonData = useSelector(state => state.pokemon.pokemons); // Récupération des données des pokemons depuis le store
  const loading = useSelector(state => state.pokemon.loading); // Récupération du state de chargement depuis le store

  const [searchTerm, setSearchTerm] = useState(''); // État local pour stocker le terme de recherche par nom ou ID
  const [searchType, setSearchType] = useState(''); // État local pour stocker le type de recherche
  const [darkMode, setDarkMode] = useState(false); // État local pour stocker le mode sombre

  useEffect(() => {
    dispatch(fetchPokemons()); // Appel de l'action fetchPokemons pour récupérer les pokemons
  }, [dispatch]);

  const handleSelect = pokemon => {
    dispatch(addToCart(pokemon)); // Dispatch de l'action addToCart pour ajouter un pokemon au panier
    console.log('Pokemon selected:', pokemon); // Affichage du pokemon sélectionné dans la console
  };

  const handleToggle = pokemon => {
    navigation.navigate('PokeCard', { pokemon }); // Navigation vers la fiche de détail du pokemon
  };

  const sortedPokemonData = pokemonData.slice().sort((a, b) => a.id - b.id); // Tri des données des pokemons par ID

  // Filtrage des pokemons en fonction des termes de recherche et du type
  const filteredPokemonData = sortedPokemonData.filter(pokemon => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()); // Vérification si le nom du pokemon correspond au terme de recherche
    const idMatch = pokemon.id.toString().includes(searchTerm.toLowerCase()); // Vérification si l'ID du pokemon correspond au terme de recherche
    const typeMatch = pokemon.types.some(type => type.type.name.toLowerCase().includes(searchType.toLowerCase())); // Vérification si le type du pokemon correspond au type de recherche

    return (nameMatch || idMatch) && (searchType === '' || typeMatch); // Retourne vrai si le nom ou l'ID correspond ET le type correspond ou n'est pas spécifié
  });

  // Fonction pour basculer entre le mode sombre et le mode clair
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View style={[darkMode ? styles.darkContainer : styles.container ]}>
      <TextInput
        style={[darkMode ? styles.darkInput : styles.input]}
        placeholder="Filter by name or ID"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />
      <TextInput
        style={[darkMode ? styles.darkInput : styles.input]}
        placeholder="Filter by type"
        value={searchType}
        onChangeText={text => setSearchType(text)}
      />
      <TouchableOpacity onPress={toggleDarkMode}>
        <FontAwesome name={darkMode ? "sun-o" : "moon-o"} size={24} color={darkMode ? "#eee" : "#333"} />
      </TouchableOpacity>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.row}>
            {filteredPokemonData && filteredPokemonData.map((pokemon, index) => (
              <PokemonCard
                key={index}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                onSelect={() => handleSelect(pokemon)}
                onToggle={() => handleToggle(pokemon)}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '90%',
    color: '#adb5bd',
  },
  darkInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#5c5552',
    color: 'white',
  },
});

export default PokeList;
