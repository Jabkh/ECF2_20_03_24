import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

const PokemonCard = ({ id, name, image, onSelect, onToggle }) => (
  <View style={styles.card}>
    {/* Badge affichant l'ID du Pokémon */}
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{id}</Text>
    </View>
    {/* Image du Pokémon */}
    <Image source={{ uri: image }} style={styles.image} />
    {/* Nom du Pokémon */}
    <Text style={styles.lightText}>{name}</Text>
    {/* Bouton pour ajouter le Pokémon à la collection */}
    <TouchableOpacity style={styles.detailButton} onPress={onSelect}>
      <Text style={styles.detailButtonText}>Ajouter à la Collection</Text>
    </TouchableOpacity>
    {/* Bouton pour afficher les détails du Pokémon */}
    <TouchableOpacity style={styles.detailButton} onPress={onToggle}>
      <Text style={styles.detailButtonText}>Afficher Détails</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 20,
    margin: 10,
    width: '60',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#8d99ae',
    padding: 5,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 1,
  },
  badgeText: {
    color: '#fefae0',
    fontWeight: 'bold',
  },
  darkText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#adb5bd',
  },
  lightText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#adb5bd',
  },
  image: {
    width: 100,
    height: 100,
  },
  detailButton: {
    marginTop: 10,
    backgroundColor: '#adb5bd',
    padding: 5,
    borderRadius: 5,
  },
  detailButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PokemonCard;
