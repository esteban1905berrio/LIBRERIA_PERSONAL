import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

export default function BookDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Libro</Text>
      <Text style={styles.subtitle}>Aquí veremos la información completa...</Text>
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
    color: Colors.accentGreen,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.textSecondary,
    marginTop: 10,
  },
});
