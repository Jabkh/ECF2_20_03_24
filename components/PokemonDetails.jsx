import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { addToCart } from '../slices/pokemonCartSlice';
import { useSelector, useDispatch } from 'react-redux';

const PokemonDetails = ({ route }) => {
    // Extraire les données du paramètre "pokemon" de la route
    const { pokemon } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // Sélectionner les données des pokémons depuis le state Redux
    const pokemonData = useSelector(state => state.pokemon.pokemons);

    // État local pour stocker l'index du Pokémon actuel
    const [currentIndex, setCurrentIndex] = useState(pokemon.id - 1);
    // État local pour stocker les détails du Pokémon actuel
    const [indexPokemon, setIndexPokemon] = useState(pokemon);

    // Trier les données des pokémons par ID
    const sortedPokemonData = pokemonData.slice().sort((a, b) => a.id - b.id);

    // Fonction pour gérer le bouton "Next"
    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % sortedPokemonData.length;
        setCurrentIndex(nextIndex);
        setIndexPokemon(sortedPokemonData[nextIndex]);
    };

    // Fonction pour gérer le bouton "Previous"
    const handlePrevious = () => {
        const previousIndex = (currentIndex - 1 + sortedPokemonData.length) % sortedPokemonData.length;
        setCurrentIndex(previousIndex);
        setIndexPokemon(sortedPokemonData[previousIndex]);
    };

    // Fonction pour ajouter le Pokémon à la collection
    const handleSelect = pokemon => {
        dispatch(addToCart(pokemon));
        console.log('Pokemon selected:', indexPokemon);
    };

    return (
        <View style={styles.container}>
            {/* Bouton pour retourner à la liste des pokémons */}
            <TouchableOpacity style={styles.detailButton} onPress={() => navigation.goBack()}>
                <Text style={styles.detailButtonText}>Retour à la liste</Text>
            </TouchableOpacity>
            <View style={styles.sectionDetail}>
                {/* Affichage du nom du Pokémon */}
                <Text style={styles.name}>{indexPokemon.name}</Text>
                {/* Affichage de l'image du Pokémon */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: indexPokemon.sprites.front_default }} style={styles.image} />
                </View>
                {/* Affichage du numéro du Pokémon */}
                <Text style={styles.badge}>No: {indexPokemon.id}</Text>
                {/* Bouton pour ajouter le Pokémon à la collection */}
                <TouchableOpacity style={styles.detailButton} onPress={() => handleSelect(indexPokemon)}>
                    <Text style={styles.detailButtonText}>Ajouter à la Collection</Text>
                </TouchableOpacity>
                {/* Affichage des types du Pokémon */}
                <View style={styles.section}>
                    <Text style={styles.sectionText}>Types: {indexPokemon.types.map(type => type.type.name).join(', ')}</Text>
                </View>
                {/* Affichage des statistiques de base du Pokémon */}
                <View style={styles.section}>
                    <Text style={styles.sectionText}>Base Stats:</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.column}>
                            {indexPokemon.stats.slice(0, Math.ceil(indexPokemon.stats.length / 2)).map(stat => (
                                <Text key={stat.stat.name} style={styles.stats}><Text style={styles.stats1}>{stat.stat.name}: </Text>{stat.base_stat}</Text>
                            ))}
                        </View>
                        <View style={styles.column}>
                            {indexPokemon.stats.slice(Math.ceil(indexPokemon.stats.length / 2)).map(stat => (
                                <Text key={stat.stat.name} style={styles.stats}><Text style={styles.stats1}>{stat.stat.name}: </Text>{stat.base_stat}</Text>
                            ))}
                        </View>
                    </View>
                </View>
                {/* Bouton pour naviguer vers le Pokémon précédent */}
                <TouchableOpacity style={styles.arrowButtonLeft} onPress={handlePrevious}>
                    <FontAwesome name="chevron-left" size={48} color="#034078" />
                </TouchableOpacity>
                {/* Bouton pour naviguer vers le Pokémon suivant */}
                <TouchableOpacity style={styles.arrowButtonRight} onPress={handleNext}>
                    <FontAwesome name="chevron-right" size={48} color="#034078" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1faee',
    },
    image: {
        width: 180,
        height: 180,
        marginBottom: 20,
    },
    name: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        height: 60,
    },
    badge: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#48cae4',
        padding: 5,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        zIndex: 1,
        fontWeight: 'bold',
    },
    section: {
        backgroundColor: '#bbdefb',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    sectionDetail: {
        borderWidth: 1,
        backgroundColor: '#8ecae6',
        padding: 20,
        marginBottom: 10,
        borderRadius: 5,
        width: '90%',
        height: '75%',
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#4cc9f0',
        textAlign: 'left',
        borderRadius: 10,
        padding: 10,
    },
    stats: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 5,
    },
    stats1: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    detailButton: {
        marginTop: 10,
        backgroundColor: '#0d3b66',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    detailButtonText: {
        color: '#fffcf2',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    column: {
        flex: 1,
        alignItems: 'flex-start',
    },
    arrowButtonLeft: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        paddingHorizontal: 20,
    },
    arrowButtonRight: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        paddingHorizontal: 20,
    },
});

export default PokemonDetails;
