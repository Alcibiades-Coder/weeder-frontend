// Importar los hooks y componentes necesarios
import { useGetMyOrders } from "@/api/OrderApi"; // Hook para obtener los pedidos del usuario
import OrderStatusDetail from "@/components/OrderStatusDetail"; // Componente para mostrar los detalles del estado de un pedido
import OrderStatusHeader from "@/components/OrderStatusHeader"; // Componente para mostrar el encabezado del estado de un pedido
import { AspectRatio } from "@/components/ui/aspect-ratio"; // Componente para controlar la relación de aspecto de las imágenes

const OrderStatusPage = () => {
  // Obtener los pedidos del usuario y el estado de carga
  const { orders, isLoading } = useGetMyOrders();

  // Si los datos están cargando, mostrar un mensaje de carga
  if (isLoading) {
    return "Loading...";
  }

  // Si no se encuentran pedidos, mostrar un mensaje indicando que no hay pedidos
  if (!orders || orders.length === 0) {
    return "No se encontraron Pedidos!";
  }

  return (
    <div className="space-y-10">
      {/* Iterar sobre los pedidos y mostrar la información de cada uno */}
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          {/* Mostrar el encabezado del estado del pedido */}
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            {/* Mostrar los detalles del estado del pedido */}
            <OrderStatusDetail order={order} />
            {/* Mostrar la imagen del restaurante con una relación de aspecto fija */}
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl} // URL de la imagen del restaurante
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

// Exportar el componente OrderStatusPage
export default OrderStatusPage;
