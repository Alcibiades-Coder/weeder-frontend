// Importar los hooks, componentes y funciones necesarias
import { useGetRestaurant } from "@/api/RestaurantApi"; // Hook personalizado para obtener datos del restaurante
import MenuItem from "@/components/MenuItem"; // Componente para mostrar cada elemento del menú
import OrderSummary from "@/components/OrderSummary"; // Componente para mostrar el resumen del pedido
import RestaurantInfo from "@/components/RestaurantInfo"; // Componente para mostrar la información del restaurante
import { AspectRatio } from "@/components/ui/aspect-ratio"; // Componente UI para mantener la relación de aspecto de las imágenes
import { Card, CardFooter } from "@/components/ui/card"; // Componentes UI para el diseño de tarjetas
import { useState } from "react"; // Hook de React para la gestión del estado
import { useParams } from "react-router-dom"; // Hook de React para acceder a los parámetros de la URL
import { MenuItem as MenuItemType } from "../types"; // Definición del tipo para el elemento del menú
import CheckoutButton from "@/components/CheckoutButton"; // Componente para el botón de checkout
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm"; // Tipo para los datos del formulario de usuario
import { useCreateCheckoutSession } from "@/api/OrderApi"; // Hook personalizado para crear la sesión de checkout

// Definición del tipo para los elementos del carrito
export type CartItem = {
  _id: string; // ID único para cada elemento del carrito
  name: string; // Nombre del menú
  price: number; // Precio del menú
  quantity: number; // Cantidad del menú en el carrito
};

const DetailPage = () => {
  // Extraer el restaurantId de los parámetros de la URL
  const { restaurantId } = useParams();

  // Obtener los datos del restaurante utilizando el hook personalizado
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  // Hook para crear la sesión de checkout
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  // Estado para almacenar los elementos del carrito, inicializado desde el sessionStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // Función para agregar un elemento del menú al carrito
  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      // Verificar si el elemento ya está en el carrito
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        // Si el elemento ya está en el carrito, actualizar la cantidad
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Si el elemento no está en el carrito, agregarlo
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      // Guardar los elementos del carrito actualizados en sessionStorage
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  // Función para eliminar un elemento del carrito
  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      // Filtrar el elemento a eliminar
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      // Guardar los elementos del carrito actualizados en sessionStorage
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  // Función para manejar el proceso de checkout
  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    // Preparar los datos para el checkout
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    // Crear la sesión de checkout y redirigir a la página de pago
    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  // Mostrar mensaje de carga si los datos del restaurante aún se están obteniendo
  if (isLoading || !restaurant) {
    return "Cargando...";
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Mostrar la imagen del restaurante con relación de aspecto */}
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          {/* Mostrar la información del restaurante */}
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menú</span>
          {/* Mostrar cada elemento del menú con la opción de agregar al carrito */}
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        <div>
          <Card>
            {/* Mostrar el resumen del pedido con la opción de eliminar elementos del carrito */}
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              {/* Botón de checkout, deshabilitado si el carrito está vacío */}
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Exportar el componente DetailPage
export default DetailPage;
