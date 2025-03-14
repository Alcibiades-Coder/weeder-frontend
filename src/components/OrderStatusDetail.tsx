import { Order } from "@/types"; // Importa el tipo Order que contiene la estructura de una orden
import { Separator } from "./ui/separator"; // Componente para crear un separador visual entre secciones

type Props = {
  order: Order; // Propiedad que recibe los detalles de la orden
};

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-5">
      {" "}
      {/* Contenedor principal con separación entre las secciones */}
      {/* Información sobre la entrega */}
      <div className="flex flex-col">
        <span className="font-bold">Entregando a:</span>
        <span>{order.deliveryDetails.name}</span>{" "}
        {/* Nombre del destinatario */}
        <span>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>{" "}
        {/* Dirección de entrega */}
      </div>
      {/* Información sobre los artículos del pedido */}
      <div className="flex flex-col">
        <span className="font-bold">Tu Pedido</span>
        <ul>
          {/* Mapea los artículos en el carrito y los muestra con su nombre y cantidad */}
          {order.cartItems.map((item) => (
            <li key={item.name}>
              ({item.name} x {item.quantity}){" "}
              {/* Nombre del artículo y cantidad */}
            </li>
          ))}
        </ul>
      </div>
      <Separator />{" "}
      {/* Separador visual entre la información del pedido y el total */}
      {/* Información del total del pedido */}
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>${(order.totalAmount / 100).toFixed(2)}</span>{" "}
        {/* Total calculado del pedido */}
      </div>
    </div>
  );
};

export default OrderStatusDetail;
