import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import sampleBooks from '../data/sampleBooks';

export default function FavoritesScreen({ navigation }) {
  
  // 1. Filtrar la base de datos: ¡Solo queremos los favoritos!
  const favoriteBooks = sampleBooks.filter(book => book.isFavorite === true);

  // 2. Tarea para dibujar cada tarjeta (Casi igual a BookList pero con bordes dorados)
  const renderFavoriteItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.bookCard}
        onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
      >
        <Image 
          source={{ uri: item.coverUrl }} 
          style={styles.thumbnail} 
        />

        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>{item.author}</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.genreBadge}>{item.genre}</Text>
          </View>
        </View>

        <View style={styles.bookActions}>
           <Ionicons name="star" size={26} color={Colors.favorite} />
        </View>
      </TouchableOpacity>
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
  bookCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: Colors.favorite, // Borde Dorado/Amarillo Rasta para los favoritos!
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
});
