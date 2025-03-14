import { CartItem } from "@/pages/DetailPage"; // Importa el tipo CartItem, que representa un item del carrito
import { Restaurant } from "@/types"; // Importa el tipo Restaurant, que representa un restaurante
import { CardContent, CardHeader, CardTitle } from "./ui/card"; // Componentes de tarjeta para mostrar el contenido de la orden
import { Badge } from "./ui/badge"; // Componente para mostrar la cantidad de un item de la orden
import { Separator } from "./ui/separator"; // Componente para separar secciones visualmente
import { Trash } from "lucide-react"; // Icono de papelera para eliminar un item del carrito

type Props = {
  restaurant: Restaurant; // Restaurante del que se está haciendo el pedido
  cartItems: CartItem[]; // Lista de items en el carrito
  removeFromCart: (cartItem: CartItem) => void; // Función para eliminar un item del carrito
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  // Función para calcular el costo total, sumando los precios de los items y el costo de envío
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    ); // Calcula el total de los items en el carrito (sin el costo de envío)

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice; // Añade el costo de envío al total

    return totalWithDelivery.toFixed(2); // Devuelve el total con dos decimales
  };

  return (
    <>
      {/* Encabezado de la tarjeta con el nombre "Tu Pedido" y el costo total */}
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Tu Pedido</span>
          <span>${getTotalCost()}</span> {/* Muestra el costo total */}
        </CardTitle>
      </CardHeader>

      {/* Contenido de la tarjeta, que incluye los items del carrito */}
      <CardContent className="flex flex-col gap-5">
        {/* Mapeo de cada item del carrito */}
        {cartItems.map((item) => (
          <div className="flex justify-between" key={item.name}>
            {/* Muestra el nombre del item y la cantidad */}
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity} {/* Muestra la cantidad de cada item */}
              </Badge>
              {item.name} {/* Muestra el nombre del item */}
            </span>

            {/* Muestra el precio total de este item (precio * cantidad) */}
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer" // Hace que el icono sea clickeable
                color="red" // Color rojo para indicar eliminación
                size={20} // Tamaño del icono
                onClick={() => removeFromCart(item)} // Llama a la función para eliminar el item
              />
              ${(item.price * item.quantity).toFixed(2)}{" "}
              {/* Muestra el precio total del item */}
            </span>
          </div>
        ))}
        <Separator /> {/* Separador entre las secciones */}
        {/* Muestra el costo de envío */}
        <div className="flex justify-between">
          <span>Costo de Envio</span>
          <span>${restaurant.deliveryPrice.toFixed(2)}</span>{" "}
          {/* Muestra el costo de envío */}
        </div>
        <Separator /> {/* Separador entre el costo de envío y otros detalles */}
      </CardContent>
    </>
  );
};

export default OrderSummary;
