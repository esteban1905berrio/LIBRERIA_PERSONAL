import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import sampleBooks from '../data/sampleBooks';

// Recibimos 'route' que contiene los parámetros enviados desde BookListScreen
export default function BookDetailScreen({ route }) {
  // Extraemos el ID del libro que nos pasaron
  const { bookId } = route.params;
  
  // Buscamos el libro en nuestra base de datos (por ahora en sampleBooks)
  const book = sampleBooks.find(b => b.id === bookId);

  // Si por alguna razón no existe el libro, mostramos un error
  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Libro no encontrado 😕</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Portada del libro grande con efecto */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: book.coverUrl }} 
          style={styles.coverImage} 
        />
        {/* Botón flotante para favoritos */}
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons 
            name={book.isFavorite ? "star" : "star-outline"} 
            size={28} 
            color={Colors.favorite} 
          />
        </TouchableOpacity>
      </View>

      {/* Detalles principales */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        
        <View style={styles.badgesRow}>
          <Text style={styles.genreBadge}>{book.genre}</Text>
          <View style={[styles.statusBadge, {
              backgroundColor: 
                book.status === 'leído' ? Colors.statusRead :
                book.status === 'leyendo' ? Colors.statusReading : Colors.statusPending
            }]}>
            <Text style={styles.statusText}>{book.status.toUpperCase()}</Text>
          </View>
        </View>

        {/* Reseña / Notas */}
        {book.notes ? (
          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Mis notas:</Text>
            <Text style={styles.notesText}>"{book.notes}"</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorText: {
    color: Colors.error,
    fontSize: 20,
    marginTop: 50,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 350,
    backgroundColor: Colors.surface,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: -20,
    right: 30,
    backgroundColor: Colors.surface,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOpacity: 0.3,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  detailsContainer: {
    padding: 24,
    paddingTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.accentYellow,
    marginBottom: 5,
  },
  author: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  genreBadge: {
    backgroundColor: Colors.card,
    color: Colors.textSecondary,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    color: Colors.surface,
    fontSize: 14,
    fontWeight: 'bold',
  },
  notesContainer: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accentGreen,
  },
  notesTitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 10,
  },
  notesText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
  },
});
