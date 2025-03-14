// Importación de tipos y hooks necesarios para el manejo de restaurantes y búsqueda
import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

// Definir la URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Hook para obtener un restaurante específico por su ID
export const useGetRestaurant = (restaurantId?: string) => {
  // Función para realizar la solicitud GET y obtener un restaurante por su ID
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  // Usar react-query para hacer la solicitud y manejar el estado de carga y error
  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantByIdRequest,
    {
      // Solo habilitar la consulta si se proporciona un restaurantId
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};

// Hook para buscar restaurantes según los criterios proporcionados
export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  // Función para crear la solicitud de búsqueda de restaurantes
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery); // Query de búsqueda
    params.set("page", searchState.page.toString()); // Página de resultados
    params.set("selectedCuisines", searchState.selectedCuisines.join(",")); // Cuisines seleccionados
    params.set("sortOption", searchState.sortOption); // Opción de ordenamiento

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  // Usar react-query para hacer la búsqueda de restaurantes y manejar el estado de carga y error
  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    {
      // Solo habilitar la consulta si se proporciona una ciudad
      enabled: !!city,
    }
  );

  return {
    results,
    isLoading,
  };
};
