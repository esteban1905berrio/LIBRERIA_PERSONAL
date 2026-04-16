import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { useBooks } from '../context/BooksContext';
import SmartImage from '../components/SmartImage';

export default function BookListScreen({ navigation }) {
  // Obtenemos los libros y la función para marcar favoritos del contexto
  const { books, toggleFavorite } = useBooks();

  // Estado para el texto de búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica de filtrado: filtramos por título o autor (ignorando mayúsculas/minúsculas)
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Función que se encarga de "dibujar" cada fila de la lista
  const renderBookItem = ({ item }) => {
    return (
      <View style={styles.bookCardContainer}>
        <TouchableOpacity 
          style={styles.bookCard}
          // Al tocar el cuerpo del libro, vamos al detalle
          onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
        >
          {/* Imagen inteligente con soporte offline */}
          <SmartImage 
            uri={item.coverUrl} 
            style={styles.thumbnail} 
          />

          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.genreBadge}>{item.genre}</Text>
              {/* Color del estado dependiendo si está leído, leyendo o pendiente */}
              <Text style={[
                styles.statusText, 
                item.status === 'leído' && { color: Colors.statusRead },
                item.status === 'leyendo' && { color: Colors.statusReading },
                item.status === 'pendiente' && { color: Colors.statusPending },
              ]}>
                • {item.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Botón de favoritos independiente a la derecha */}
        <TouchableOpacity 
          style={styles.favoriteAction}
          onPress={() => toggleFavorite(item.id)}
        >
          {item.isFavorite ? (
            <Ionicons name="star" size={26} color={Colors.favorite} />
          ) : (
            <Ionicons name="star-outline" size={26} color={Colors.textMuted} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda dinámica */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textMuted} style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Busca por título o autor..."
          placeholderTextColor={Colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing" // Solo para iOS
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Componente clave en React Native para listas largas */}
      <FlatList
        data={filteredBooks} // Ahora usamos la lista ya filtrada
        keyExtractor={(item) => item.id} // Cómo identificar cada elemento
        renderItem={renderBookItem} // La función que dibuja el diseño de un libro
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        // Mensaje si no se encuentra nada
        ListEmptyComponent={
          <View style={styles.emptySearch}>
            <Ionicons name="search-outline" size={60} color={Colors.textMuted} />
            <Text style={styles.emptySearchText}>No encontramos resultados para tu búsqueda 😕</Text>
          </View>
        }
      />

      {/* Botón Flotante (FAB) */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddEditBook')}
      >
        <Ionicons name="add" size={32} color={Colors.surface} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 30, // Espacio al final por la navegación
  },
  emptySearch: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    paddingHorizontal: 40,
  },
  emptySearchText: {
    color: Colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
  },
  bookCardContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowOpacity: 0.2,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accentGreen,
  },
  bookCard: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 70,
    borderRadius: 4,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreBadge: {
    backgroundColor: Colors.card,
    color: Colors.textSecondary,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteAction: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.accentYellow,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Sombra para Android
    shadowColor: '#000', // Sombras para iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
});
