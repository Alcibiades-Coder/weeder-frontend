// Importación de tipos y hooks necesarios para el manejo de datos y autenticación
import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

// Definir la URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Hook para obtener el restaurante del usuario autenticado
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función para realizar la solicitud GET al API y obtener el restaurante
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Fallo al Obtener Restaurantes");
    }
    return response.json();
  };

  // Usar react-query para hacer la solicitud y manejar el estado
  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

// Hook para crear un nuevo restaurante
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función para enviar la solicitud POST para crear el restaurante
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Fallo al crear un Restaurante");
    }

    return response.json();
  };

  // Usar react-query para la mutación de datos (crear restaurante)
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  // Mostrar mensajes de éxito o error usando Toast
  if (isSuccess) {
    toast.success("Restaurante creado!");
  }

  if (error) {
    toast.error("Imposible actualizar el Restaurante");
  }

  return { createRestaurant, isLoading };
};

// Hook para actualizar un restaurante existente
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función para enviar la solicitud PUT para actualizar el restaurante
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  // Usar react-query para la mutación de datos (actualizar restaurante)
  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);

  // Mostrar mensajes de éxito o error usando Toast
  if (isSuccess) {
    toast.success("Restaurante actualizado");
  }

  if (error) {
    toast.error("Imposible actualizar el Restaurante");
  }

  return { updateRestaurant, isLoading };
};

// Hook para obtener las órdenes del restaurante
export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función para realizar la solicitud GET y obtener las órdenes del restaurante
  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  // Usar react-query para hacer la solicitud y manejar el estado
  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  );

  return { orders, isLoading };
};

// Tipo para la solicitud de actualización de estado de un pedido
type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

// Hook para actualizar el estado de un pedido
export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función para enviar la solicitud PATCH para actualizar el estado del pedido
  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  // Usar react-query para la mutación de datos (actualizar estado de pedido)
  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);

  // Mostrar mensajes de éxito o error usando Toast
  if (isSuccess) {
    toast.success("Pedido actualizado");
  }

  if (isError) {
    toast.error("Imposible actualizar el Pedido");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};
