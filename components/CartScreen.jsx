import React from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../slices/pokemonCartSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const CartScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation(); // Initialisation de useNavigation
    const cart = useSelector(state => state.pokemonCart.cart);

    const handleRemoveFromCart = (pokemon) => {
        dispatch(removeFromCart(pokemon));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleToggle = pokemon => {
        navigation.navigate('PokeCard', { pokemon }); // Navigation vers PokemonDetails avec les détails du Pokémon sélectionné
    };

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.sprites.front_default }} style={styles.image} />
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
                <FontAwesome name="trash-o" size={24} color="#c1121f" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleToggle(item)}>
                <MaterialIcons name="search" size={24} color="#457b9d" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Collection</Text>
            <TouchableOpacity style={styles.detailButton} onPress={handleClearCart}>
                <Text style={styles.detailButtonText}>Clear Collection</Text>
            </TouchableOpacity>
            {cart.length > 0 ? (
                <FlatList
                    data={cart}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text>Your collection is empty.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    listContainer: {
        alignItems: 'center',
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        width: '80%',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    detailButton: {
        marginTop: 10,
        backgroundColor: '#c1121f',
        padding: 10,
        borderRadius: 5,
    },
    detailButtonText: {
        color: '#edf2f4',
        fontWeight: 'bold',
    },
});

export default CartScreen;
