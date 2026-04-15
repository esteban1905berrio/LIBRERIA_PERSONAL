import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Círculo del Avatar */}
      <View style={styles.avatarContainer}>
        <Ionicons name="person" size={60} color={Colors.surface} />
      </View>
      
      <Text style={styles.title}>Mi Perfil</Text>
      <Text style={styles.subtitle}>Configura tu espacio personal</Text>

      {/* Botón de acción temporal */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
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
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.accentGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: Colors.accentYellow,
  },
  title: {
    fontSize: 28,
    color: Colors.accentYellow,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.textSecondary,
    marginTop: 5,
    marginBottom: 30,
  },
  button: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
