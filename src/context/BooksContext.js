import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import initialBooks from '../data/sampleBooks';

const BooksContext = createContext();

const STORAGE_KEY = '@hojas_raices_books';

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. CARGA INICIAL: Leer del disco duro al abrir la app
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedBooks !== null) {
          // Si hay datos guardados, los usamos
          setBooks(JSON.parse(storedBooks));
        } else {
          // Si es la primera vez, cargamos los libros de ejemplo
          setBooks(initialBooks);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialBooks));
        }
      } catch (error) {
        console.error('Error cargando libros:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  // 2. GUARDADO AUTOMÁTICO: Cada vez que 'books' cambie, guardamos en el disco duro
  useEffect(() => {
    const saveBooks = async () => {
      if (!isLoading) { // Evitamos guardar antes de que termine la carga inicial
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
        } catch (error) {
          console.error('Error guardando libros:', error);
        }
      }
    };

    saveBooks();
  }, [books, isLoading]);

  // --- FUNCIONES CRUD ---

  // AGREGAR (CREATE)
  const addBook = (newBook) => {
    const bookWithId = {
      ...newBook,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      coverUrl: newBook.coverUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    };
    setBooks((prevBooks) => [...prevBooks, bookWithId]);
  };

  // ACTUALIZAR (UPDATE)
  const updateBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === updatedBook.id ? { ...book, ...updatedBook } : book
      )
    );
  };

  // ELIMINAR (DELETE)
  const deleteBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  // FAVORITO (TOGGLE)
  const toggleFavorite = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book
      )
    );
  };

  // ESTADO (READING STATUS)
  const updateBookStatus = (bookId, newStatus) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, status: newStatus } : book
      )
    );
  };

  return (
    <BooksContext.Provider value={{ 
      books, 
      isLoading, 
      addBook, 
      updateBook, 
      deleteBook, 
      toggleFavorite, 
      updateBookStatus 
    }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks debe ser usado dentro de un BooksProvider');
  }
  return context;
};
