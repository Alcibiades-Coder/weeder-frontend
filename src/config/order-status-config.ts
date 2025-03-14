import { OrderStatus } from "@/types"; // Importa el tipo OrderStatus desde el archivo de tipos

// Define la estructura de un objeto que representa la información del estado de una orden
type OrderStatusInfo = {
  label: string; // Etiqueta que describe el estado de la orden (ej. "Ordenado", "En Progreso")
  value: OrderStatus; // El valor del estado, que es un tipo definido como "OrderStatus"
  progressValue: number; // Un valor numérico entre 0 y 100 que indica el progreso de la orden
};

// Array de objetos que define los diferentes estados de una orden
export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "Ordenado", value: "placed", progressValue: 0 }, // El pedido ha sido realizado, progreso al 0%
  {
    label: "Esperando la Confirmación del Restaurante",
    value: "paid",
    progressValue: 25, // El pedido ha sido pagado, progreso al 25%
  },
  { label: "En Progreso", value: "inProgress", progressValue: 50 }, // El pedido está siendo preparado, progreso al 50%
  {
    label: "Saliendo para Entrega",
    value: "outForDelivery",
    progressValue: 75, // El pedido está en camino hacia el cliente, progreso al 75%
  },
  { label: "Entregado", value: "delivered", progressValue: 100 }, // El pedido ha sido entregado, progreso al 100%
];
