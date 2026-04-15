// 🎨 Paleta de colores centralizada de BookShelf
// Usar siempre estas constantes en lugar de colores directos en los componentes
// Temática: Rasta / Reggae (Verde, Amarillo, Rojo) con fondo oscuro profesional

const Colors = {
  // Fondos
  background: '#121212',      // Oscuro profesional para que resalten los colores
  surface: '#1E1E1E',         // Gris oscuro para tarjetas
  card: '#292929',            // Gris medio para elementos elevados

  // Texto
  textPrimary: '#EFEFEF',     // Texto principal (claro)
  textSecondary: '#AAAAAA',   // Texto secundario
  textMuted: '#777777',       // Texto apagado

  // Acentos principales (Rasta)
  accentGreen: '#009E60',     // Verde intenso
  accentYellow: '#FFD700',    // Amarillo dorado
  accentRed: '#DE3163',       // Rojo vivo (ligeramente suave)

  // Color de acción principal
  accent: '#009E60',          // Usamos el verde como acción por defecto

  // Estados de libro (¡Aprovechamos los colores rasta perfectamente!)
  statusRead: '#009E60',      // Verde → Leído
  statusReading: '#FFD700',   // Amarillo → Leyendo
  statusPending: '#DE3163',   // Rojo → Pendiente

  // Favoritos
  favorite: '#FFD700',        // Dorado → Favorito activo

  // Utilidades
  border: '#333333',
  error: '#DE3163',
  white: '#ffffff',
  black: '#000000',
};

export default Colors;
