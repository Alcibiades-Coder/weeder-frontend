// Importación de tipos y hooks necesarios para el manejo de datos y autenticación
import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

// Definir la URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Hook para obtener las órdenes del usuario autenticado
export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función para realizar la solicitud GET y obtener las órdenes del usuario
  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get orders");
    }

    return response.json();
  };

  // Usar react-query para hacer la solicitud y manejar el estado de carga y error
  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest,
    {
      refetchInterval: 5000, // Refresca las órdenes cada 5 segundos
    }
  );

  return { orders, isLoading };
};

// Tipo para la solicitud de creación de una sesión de pago
type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

// Hook para crear una sesión de pago
export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función para enviar la solicitud POST para crear la sesión de pago
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }

    return response.json();
  };

  // Usar react-query para la mutación de datos (crear sesión de pago)
  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  // Mostrar mensaje de error si ocurre un problema al crear la sesión de pago
  if (error) {
    toast.error(error.toString());
    reset(); // Resetear el estado después del error
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};
