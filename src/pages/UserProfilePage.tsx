// Importar los hooks y componentes necesarios
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"; // Hooks para obtener y actualizar el perfil de usuario
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"; // Componente para mostrar el formulario de perfil de usuario

const UserProfilePage = () => {
  // Obtener los datos del usuario actual y el estado de carga
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  // Hook para actualizar los datos del usuario y el estado de carga
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  // Si los datos del usuario se están cargando, mostrar un mensaje de carga
  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  // Si no se encuentran datos del usuario, mostrar un mensaje de error
  if (!currentUser) {
    return <span>Imposible leer el Perfil de Usuario</span>;
  }

  return (
    // Renderizar el formulario de perfil de usuario con los datos actuales
    // y pasar las funciones de actualización y el estado de carga
    <UserProfileForm
      currentUser={currentUser} // Pasar los datos del usuario actual
      onSave={updateUser} // Función para guardar los cambios en el perfil
      isLoading={isUpdateLoading} // Estado de carga al actualizar el perfil
    />
  );
};

// Exportar el componente UserProfilePage
export default UserProfilePage;
