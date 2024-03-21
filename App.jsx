import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import PokeList from './components/PokeList';
import CartScreen from './components/CartScreen';
import PokemonDetails from './components/PokemonDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// Stack Navigator pour la navigation entre les écrans de l'application
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PokéList" component={PokeList} options={{ headerShown: false }} />
      <Stack.Screen name="PokeCard" component={PokemonDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* Tab Navigator pour la navigation entre les onglets de l'application */}
        <Tab.Navigator
          screenOptions={() => ({
            tabBarIcon: () => null, // Cacher les icônes par défaut
            activeColor: "#f0edf6", // Couleur active de l'onglet
            inactiveColor: "#d62246", // Couleur inactive de l'onglet
          })}
        >
          {/* Onglet pour afficher la liste des pokémons */}
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              title: 'Home',
              tabBarLabel: 'PokéHome', 
              tabBarIcon: ({ color }) => (
                <FontAwesome name="home" color={color} size={26} />
              ),
            }}
          />
          {/* Onglet pour afficher la collection de pokémons */}
          <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
              title: 'Collection',
              tabBarLabel: 'Collection',
              tabBarIcon: ({ color }) => (
                <FontAwesome name="shopping-cart" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
