// 📚 Datos de muestra para BookShelf
// Estos libros aparecerán la primera vez que se abra la app
// Son solo para demostración y pruebas

const sampleBooks = [
  {
    id: '1',
    title: 'El Alquimista',
    author: 'Paulo Coelho',
    genre: 'Ficción',
    status: 'leído',
    rating: 5,
    notes: 'Un libro que cambia la perspectiva de vida. Muy inspirador.',
    isFavorite: true,
    createdAt: '2026-01-10',
  },
  {
    id: '2',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'Historia',
    status: 'leído',
    rating: 4,
    notes: 'Visión fascinante de la historia humana.',
    isFavorite: false,
    createdAt: '2026-02-05',
  },
  {
    id: '3',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Tecnología',
    status: 'leyendo',
    rating: 0,
    notes: '',
    isFavorite: true,
    createdAt: '2026-03-20',
  },
  {
    id: '4',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Ciencia Ficción',
    status: 'pendiente',
    rating: 0,
    notes: 'Me lo recomendaron mucho.',
    isFavorite: false,
    createdAt: '2026-04-01',
  },
];

export default sampleBooks;
