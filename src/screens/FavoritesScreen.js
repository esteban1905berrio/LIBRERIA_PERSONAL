import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Favoritos</Text>
      <Text style={styles.subtitle}>Tus libros preferidos aparecerán aquí...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: Colors.accentRed,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.textSecondary,
    marginTop: 10,
  },
});
