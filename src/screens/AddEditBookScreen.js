import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Colors from '../constants/colors';

export default function AddEditBookScreen({ navigation }) {
  // Estados para capturar lo que el usuario escribe
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [notes, setNotes] = useState('');

  // Función temporal para "guardar"
  const handleSave = () => {
    if (title.trim() === '' || author.trim() === '') {
      Alert.alert('Error', 'El título y el autor son obligatorios.');
      return;
    }
    
    // Aquí más adelante conectaremos la Persistencia de Datos (Semana 6)
    Alert.alert('¡Éxito!', `Libro "${title}" listo para ser guardado (próximamente)`);
    navigation.goBack(); // Volvemos a la pantalla anterior
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Agregar Nuevo Libro</Text>
      
      {/* Campo: Título */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Título original *</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ej: El señor de los anillos"
          placeholderTextColor={Colors.textMuted}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Campo: Autor */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Autor del libro *</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ej: J.R.R. Tolkien"
          placeholderTextColor={Colors.textMuted}
          value={author}
          onChangeText={setAuthor}
        />
      </View>

      {/* Campo: Género */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Género literario</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ej: Fantasía"
          placeholderTextColor={Colors.textMuted}
          value={genre}
          onChangeText={setGenre}
        />
      </View>

      {/* Campo: Notas */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tus Notas / Reseña inicial</Text>
        <TextInput 
          style={[styles.input, styles.textArea]}
          placeholder="¿Por qué quieres leerlo o qué te pareció?"
          placeholderTextColor={Colors.textMuted}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Botón Guardar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Libro</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.accentYellow,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: Colors.surface,
    color: Colors.textPrimary,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Importante para Android
  },
  saveButton: {
    backgroundColor: Colors.accentGreen,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
