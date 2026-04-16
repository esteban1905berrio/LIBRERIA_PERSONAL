import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { useBooks } from '../context/BooksContext';

export default function AddEditBookScreen({ navigation, route }) {
  // Obtenemos los libros y las funciones del cerebro central
  const { books, addBook, updateBook } = useBooks();

  // Revisamos si recibimos un ID por parámetros (significa que estamos EDITANDO)
  const bookId = route.params?.bookId;
  const isEditing = !!bookId;

  // Estado local para el formulario
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [status, setStatus] = useState('pendiente'); // Nuevo estado para el status

  // EFECTO: Si estamos editando, rellenamos los campos con la info actual
  useEffect(() => {
    if (isEditing) {
      const bookToEdit = books.find(b => b.id === bookId);
      if (bookToEdit) {
        setTitle(bookToEdit.title);
        setAuthor(bookToEdit.author);
        setGenre(bookToEdit.genre);
        setIsFavorite(bookToEdit.isFavorite);
        setStatus(bookToEdit.status || 'pendiente'); // Cargamos el status actual
      }
    }
  }, [isEditing, bookId, books]);

  const handleSave = () => {
    if (title.trim() === '' || author.trim() === '') {
      Alert.alert('Error', 'El título y el autor son obligatorios.');
      return;
    }
    
    // Objeto con los datos capturados
    const bookData = {
      title,
      author,
      genre: genre || 'General',
      isFavorite,
      status, // Enviamos el status seleccionado
    };

    if (isEditing) {
      // Si editamos, llamamos a updateBook con el ID original
      updateBook({ id: bookId, ...bookData });
      Alert.alert('¡Listos!', `${title} ha sido actualizado.`);
    } else {
      // Si es nuevo, llamamos a addBook
      addBook(bookData);
      Alert.alert('¡Excelente!', `${title} ha sido agregado a tu biblioteca.`);
    }
    
    navigation.goBack(); 
  };

  return (
    <ScrollView style={styles.container}>
      {/* ... cabecera ... */}
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Edita tu Libro' : 'Agrega un Nuevo Libro'}
          </Text>
          <Text style={styles.subtitle}>
            {isEditing ? 'Actualiza los detalles de este libro.' : 'Escribe los datos de tu próxima aventura.'}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.favoriteToggle} 
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons 
            name={isFavorite ? "star" : "star-outline"} 
            size={36} 
            color={isFavorite ? Colors.favorite : Colors.textMuted} 
          />
        </TouchableOpacity>
      </View>

      {/* Selector de Estado (NUEVO) */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Estado de lectura</Text>
        <View style={styles.statusSelectors}>
          <TouchableOpacity 
            style={[
              styles.statusOption, 
              status === 'pendiente' && { backgroundColor: Colors.statusPending, borderColor: Colors.statusPending }
            ]}
            onPress={() => setStatus('pendiente')}
          >
            <Text style={[styles.statusOptionText, status === 'pendiente' && { color: Colors.surface }]}>PENDIENTE</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.statusOption, 
              status === 'leyendo' && { backgroundColor: Colors.statusReading, borderColor: Colors.statusReading }
            ]}
            onPress={() => setStatus('leyendo')}
          >
            <Text style={[styles.statusOptionText, status === 'leyendo' && { color: Colors.surface }]}>LEYENDO</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.statusOption, 
              status === 'leído' && { backgroundColor: Colors.statusRead, borderColor: Colors.statusRead }
            ]}
            onPress={() => setStatus('leído')}
          >
            <Text style={[styles.statusOptionText, status === 'leído' && { color: Colors.surface }]}>LEÍDO</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input para Título */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título del libro *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: El señor de los anillos"
          placeholderTextColor={Colors.textMuted}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Input para Autor */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Autor *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: J.R.R. Tolkien"
          placeholderTextColor={Colors.textMuted}
          value={author}
          onChangeText={setAuthor}
        />
      </View>

      {/* Input para Género */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Género</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: Fantasía"
          placeholderTextColor={Colors.textMuted}
          value={genre}
          onChangeText={setGenre}
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
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.accentYellow,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 30,
  },
  favoriteToggle: {
    padding: 5,
  },
  statusSelectors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 4,
  },
  statusOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  statusOptionText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: Colors.surface,
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: Colors.accentGreen,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  saveButtonText: {
    color: Colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
