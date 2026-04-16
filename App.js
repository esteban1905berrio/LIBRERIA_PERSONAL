import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Colors from './src/constants/colors';

import { BooksProvider } from './src/context/BooksContext';
import { UserProvider } from './src/context/UserContext';

// Importar pantallas
import HomeScreen from './src/screens/HomeScreen';
import BookListScreen from './src/screens/BookListScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BookDetailScreen from './src/screens/BookDetailScreen'; 
import AddEditBookScreen from './src/screens/AddEditBookScreen';

// Instanciar los Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 1. Agrupamos nuestras 4 pestañas de abajo en un solo componente
function TabNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Mapear íconos según la pestaña activa o inactiva
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Mis Libros') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'Favoritos') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Perfil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // Estilos de color para la barra inferior
          tabBarActiveTintColor: Colors.accentYellow,
          tabBarInactiveTintColor: Colors.textMuted,
          tabBarStyle: {
            backgroundColor: Colors.surface,
            borderTopColor: Colors.border,
            paddingBottom: 5,
            height: 60,
          },
          // Estilo general para las cabeceras (la barrita que dice "Inicio" o "Favoritos" arriba)
          headerStyle: {
            backgroundColor: Colors.surface,
          },
          headerTintColor: Colors.textPrimary,
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Mis Libros" component={BookListScreen} />
        <Tab.Screen name="Favoritos" component={FavoritesScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
  );
}

// 2. El Stack Navigator principal (que envuelve las pestañas y las pantallas sueltas)
export default function App() {
  return (
    <UserProvider>
      <BooksProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator>
            {/* Primero cargamos el bloque de pestañas inferiores, sin título de cabecera porque las pestañas ya tienen el suyo */}
            <Stack.Screen 
              name="MainTabs" 
              component={TabNavigator} 
              options={{ headerShown: false }} 
            />
            
            {/* Aquí ponemos la pantalla que se sobrepondrá cuando toquemos un libro */}
            <Stack.Screen 
              name="BookDetail" 
              component={BookDetailScreen} 
              options={{ 
                title: 'Detalle del Libro',
                headerStyle: { backgroundColor: Colors.surface },
                headerTintColor: Colors.textPrimary,
              }} 
            />

            <Stack.Screen 
              name="AddEditBook" 
              component={AddEditBookScreen} 
              options={{ 
                title: 'Nuevo Libro 🌿',
                headerStyle: { backgroundColor: Colors.surface },
                headerTintColor: Colors.textPrimary,
              }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </BooksProvider>
    </UserProvider>
  );
}

