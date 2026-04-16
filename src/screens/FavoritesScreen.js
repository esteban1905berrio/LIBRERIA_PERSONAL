import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { useBooks } from '../context/BooksContext';
import SmartImage from '../components/SmartImage';

export default function FavoritesScreen({ navigation }) {
  // Obtenemos los libros y la función para togglear favoritos del contexto
  const { books, toggleFavorite } = useBooks();
  
  // 1. Filtrar la base de datos: ¡Solo queremos los favoritos!
  const favoriteBooks = books.filter(book => book.isFavorite === true);

  // 2. Tarea para dibujar cada tarjeta (Casi igual a BookList pero con bordes dorados)
  const renderFavoriteItem = ({ item }) => {
    return (
      <View style={styles.bookCardContainer}>
        <TouchableOpacity 
          style={styles.bookCard}
          onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
        >
          <SmartImage 
            uri={item.coverUrl} 
            style={styles.thumbnail} 
          />

          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.genreBadge}>{item.genre}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.favoriteAction}
          onPress={() => toggleFavorite(item.id)}
        >
           <Ionicons name="star" size={26} color={Colors.favorite} />
        </TouchableOpacity>
      </View>
    );
  };

  // 3. ¿Qué pasa si no tenemos favoritos? Mostramos un mensaje vacío
  if (favoriteBooks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="sad-outline" size={80} color={Colors.textMuted} />
        <Text style={styles.emptyText}>Aún no tienes libros favoritos.</Text>
      </View>
    );
  }

  // 4. Si hay favoritos, dibujamos la lista
  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderFavoriteItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
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
    borderLeftColor: Colors.favorite,
  },
  bookCard: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 85,
    borderRadius: 6,
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
    marginBottom: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreBadge: {
    backgroundColor: Colors.card,
    color: Colors.textSecondary,
    fontSize: 13,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  bookActions: {
    paddingLeft: 10,
  },
  favoriteAction: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
