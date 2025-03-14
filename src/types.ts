// Definición del tipo User que representa a un usuario con su información básica
export type User = {
  _id: string; // Identificador único del usuario
  email: string; // Correo electrónico del usuario
  name: string; // Nombre del usuario
  addressLine1: string; // Dirección del usuario (línea 1)
  city: string; // Ciudad del usuario
  country: string; // País del usuario
};

// Definición del tipo MenuItem que representa un ítem del menú en un restaurante
export type MenuItem = {
  _id: string; // Identificador único del ítem del menú
  name: string; // Nombre del ítem del menú
  price: number; // Precio del ítem del menú
};

// Definición del tipo Restaurant que representa la información de un restaurante
export type Restaurant = {
  _id: string; // Identificador único del restaurante
  user: string; // ID del usuario que posee el restaurante (relación con el tipo User)
  restaurantName: string; // Nombre del restaurante
  city: string; // Ciudad en la que se encuentra el restaurante
  country: string; // País en el que se encuentra el restaurante
  deliveryPrice: number; // Precio de la entrega del restaurante
  estimatedDeliveryTime: number; // Tiempo estimado de entrega en minutos
  cuisines: string[]; // Lista de tipos de cocina ofrecidos por el restaurante
  menuItems: MenuItem[]; // Lista de los ítems del menú del restaurante
  imageUrl: string; // URL de la imagen del restaurante
  lastUpdated: string; // Fecha y hora de la última actualización del restaurante
};

// Definición de los posibles estados de una orden
export type OrderStatus =
  | "placed" // Pedido realizado
  | "paid" // Pedido pagado
  | "inProgress" // Pedido en proceso
  | "outForDelivery" // Pedido en camino
  | "delivered"; // Pedido entregado

// Definición del tipo Order que representa una orden de un restaurante
export type Order = {
  _id: string; // Identificador único de la orden
  restaurant: Restaurant; // Restaurante asociado con la orden
  user: User; // Usuario que realizó la orden
  cartItems: {
    // Lista de los ítems en el carrito de la orden
    menuItemId: string; // ID del ítem del menú
    name: string; // Nombre del ítem
    quantity: string; // Cantidad del ítem
  }[];
  deliveryDetails: {
    // Detalles de la entrega de la orden
    name: string; // Nombre del destinatario de la entrega
    addressLine1: string; // Dirección del destinatario (línea 1)
    city: string; // Ciudad del destinatario
    email: string; // Correo electrónico del destinatario
  };
  totalAmount: number; // Monto total de la orden
  status: OrderStatus; // Estado actual de la orden
  createdAt: string; // Fecha y hora de creación de la orden
  restaurantId: string; // ID del restaurante asociado con la orden
};

// Definición de la respuesta de la búsqueda de restaurantes, incluyendo la lista de restaurantes y los detalles de paginación
export type RestaurantSearchResponse = {
  data: Restaurant[]; // Lista de restaurantes encontrados
  pagination: {
    // Detalles de paginación
    total: number; // Total de restaurantes disponibles
    page: number; // Página actual de los resultados
    pages: number; // Número total de páginas
  };
};
