// Importar los hooks y componentes necesarios
import {
  useCreateMyRestaurant, // Hook para crear un restaurante
  useGetMyRestaurant, // Hook para obtener los datos del restaurante
  useGetMyRestaurantOrders, // Hook para obtener los pedidos del restaurante
  useUpdateMyRestaurant, // Hook para actualizar los datos del restaurante
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard"; // Componente para mostrar cada pedido
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Componentes de pestañas para navegación
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"; // Formulario para gestionar el restaurante

const ManageRestaurantPage = () => {
  // Hook para crear un restaurante, y estado de carga
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  // Hook para obtener los detalles del restaurante
  const { restaurant } = useGetMyRestaurant();
  // Hook para actualizar los detalles del restaurante, y estado de carga
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  // Hook para obtener los pedidos del restaurante
  const { orders } = useGetMyRestaurantOrders();

  // Determina si el restaurante está siendo editado (si existe un restaurante)
  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue="orders">
      {/* Lista de las pestañas para la navegación */}
      <TabsList>
        {/* Pestaña para ver los pedidos */}
        <TabsTrigger value="orders">Pedidos</TabsTrigger>
        {/* Pestaña para gestionar el restaurante */}
        <TabsTrigger value="manage-restaurant">
          Administrar Restaurantes
        </TabsTrigger>
      </TabsList>
      {/* Contenido de la pestaña "Pedidos" */}
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        {/* Título con el número de pedidos en curso */}
        <h2 className="text-2xl font-bold">
          {orders?.length} Pedidos en Curso
        </h2>
        {/* Mostrar los pedidos actuales utilizando el componente OrderItemCard */}
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      {/* Contenido de la pestaña "Administrar Restaurantes" */}
      <TabsContent value="manage-restaurant">
        {/* Formulario para administrar el restaurante */}
        <ManageRestaurantForm
          restaurant={restaurant} // Pasa los detalles del restaurante al formulario
          onSave={isEditing ? updateRestaurant : createRestaurant} // Define si se va a crear o actualizar el restaurante
          isLoading={isCreateLoading || isUpdateLoading} // Estado de carga durante la creación o actualización
        />
      </TabsContent>
    </Tabs>
  );
};

// Exportar el componente ManageRestaurantPage
export default ManageRestaurantPage;
