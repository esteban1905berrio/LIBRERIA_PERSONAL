import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🌿📚</Text>
      <Text style={styles.title}>Hojas & Raíces</Text>
      <Text style={styles.subtitle}>Resumen de tu biblioteca</Text>
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
  icon: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.accentYellow,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 5,
  },
});
