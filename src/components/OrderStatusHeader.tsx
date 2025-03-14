import { Order } from "@/types"; // Importa el tipo Order que contiene los detalles de una orden
import { Progress } from "./ui/progress"; // Importa el componente para mostrar una barra de progreso
import { ORDER_STATUS } from "@/config/order-status-config"; // Importa la configuración de los posibles estados de una orden

type Props = {
  order: Order; // Propiedad que recibe los detalles de la orden
};

const OrderStatusHeader = ({ order }: Props) => {
  // Función para calcular la hora estimada de entrega, añadiendo el tiempo estimado al tiempo de creación de la orden
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt); // Fecha de creación de la orden

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    ); // Suma el tiempo estimado de entrega a la hora de creación

    const hours = created.getHours(); // Obtiene las horas de la hora estimada
    const minutes = created.getMinutes(); // Obtiene los minutos de la hora estimada

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Añade un 0 en los minutos si es necesario (para formato HH:MM)

    return `${hours}:${paddedMinutes}`; // Devuelve la hora estimada de entrega en formato HH:MM
  };

  // Función para obtener el estado de la orden con la información de la configuración de ORDER_STATUS
  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    ); // Busca el estado de la orden en ORDER_STATUS, o retorna el primero si no se encuentra
  };

  return (
    <>
      {/* Título con el estado de la orden y el tiempo estimado de entrega */}
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span> Estado de Pedidos: {getOrderStatusInfo().label}</span>{" "}
        {/* Muestra el estado actual de la orden */}
        <span> Esperado para: {getExpectedDelivery()}</span>{" "}
        {/* Muestra la hora estimada de entrega */}
      </h1>

      {/* Barra de progreso que muestra el progreso de la orden basado en el estado */}
      <Progress
        className="animate-pulse" // Aplica animación de pulso a la barra de progreso
        value={getOrderStatusInfo().progressValue} // Asigna el valor del progreso según el estado de la orden
      />
    </>
  );
};

export default OrderStatusHeader;
