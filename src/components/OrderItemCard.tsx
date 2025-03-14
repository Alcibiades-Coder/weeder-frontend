import { Order, OrderStatus } from "@/types"; // Tipos de datos para la orden y el estado de la orden
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"; // Componentes de la UI para mostrar la tarjeta de la orden
import { Separator } from "./ui/separator"; // Componente para separar visualmente las secciones
import { Badge } from "./ui/badge"; // Componente de badge para mostrar la cantidad de items en el carrito
import { Label } from "./ui/label"; // Componente de etiqueta para los campos de la interfaz
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"; // Componentes para mostrar un selector de estado de la orden
import { ORDER_STATUS } from "@/config/order-status-config"; // Configuración de los posibles estados de la orden
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi"; // Hook para actualizar el estado de la orden en la API
import { useEffect, useState } from "react"; // Hooks para gestionar el estado y efectos secundarios

type Props = {
  order: Order; // Propiedad que contiene los detalles de la orden
};

const OrderItemCard = ({ order }: Props) => {
  // Hook para actualizar el estado de la orden en el backend
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();

  // Estado local para gestionar el estado actual de la orden
  const [status, setStatus] = useState<OrderStatus>(order.status);

  // Efecto que se ejecuta cuando el estado de la orden cambia
  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  // Función que maneja el cambio de estado de la orden
  const handleStatusChange = async (newStatus: OrderStatus) => {
    // Actualiza el estado de la orden en la API
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus); // Actualiza el estado local de la orden
  };

  // Función para obtener la hora en formato hh:mm desde el timestamp de la orden
  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    // Formatea los minutos con 0 si son menores a 10
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          {/* Información del cliente */}
          <div>
            Nombre Cliente:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>

          {/* Dirección de entrega */}
          <div>
            Dirección de Entrega:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>

          {/* Hora de la orden */}
          <div>
            Hora:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>

          {/* Costo total de la orden */}
          <div>
            Costo Total:
            <span className="ml-2 font-normal">
              ${(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator /> {/* Separador visual */}
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Muestra los items del carrito de la orden */}
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span key={cartItem.name}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>

        {/* Selector para cambiar el estado de la orden */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Cual es el estado de esta Orden?</Label>
          <Select
            value={status}
            disabled={isLoading} // Desactiva el selector mientras se está cargando
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {/* Mapea los posibles estados para mostrarlos en el selector */}
              {ORDER_STATUS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
