// Importación de tipos y hooks necesarios para el manejo de datos y autenticación
import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

// Definir la URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Hook para obtener el usuario autenticado
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función para realizar la solicitud GET al API y obtener los datos del usuario
  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  // Usar react-query para hacer la solicitud y manejar el estado de carga y error
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  // Mostrar el error en caso de que ocurra
  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};

// Tipo para la solicitud de creación de un nuevo usuario
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

// Hook para crear un nuevo usuario
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función para enviar la solicitud POST para crear el usuario
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  // Usar react-query para la mutación de datos (crear usuario)
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

// Tipo para la solicitud de actualización de datos de usuario
type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

// Hook para actualizar los datos de un usuario
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función para enviar la solicitud PUT para actualizar los datos del usuario
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  // Usar react-query para la mutación de datos (actualizar usuario)
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  // Mostrar mensaje de éxito si la actualización fue exitosa
  if (isSuccess) {
    toast.success("Perfil de Usuario actualizado!");
  }

  // Mostrar mensaje de error si ocurre un problema durante la actualización
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};
