// Importación de dependencias necesarias para la autenticación, manejo de rutas, y componentes UI
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

// Definición de las propiedades que recibirá el componente
type Props = {
  onCheckout: (userFormData: UserFormData) => void; // Función que se ejecuta al confirmar el checkout
  disabled: boolean; // Si el botón debe estar deshabilitado
  isLoading: boolean; // Estado de carga
};

// Componente que maneja el botón de checkout
const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  // Hook de Auth0 para obtener el estado de autenticación
  const {
    isAuthenticated, // Si el usuario está autenticado
    isLoading: isAuthLoading, // Si la autenticación está en proceso
    loginWithRedirect, // Función para redirigir al usuario para iniciar sesión
  } = useAuth0();

  // Obtener la ubicación actual de la ruta
  const { pathname } = useLocation();

  // Hook personalizado para obtener la información del usuario actual
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  // Función para redirigir al usuario al login si no está autenticado
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname, // Después de iniciar sesión, redirigir al usuario a la ruta actual
      },
    });
  };

  // Si el usuario no está autenticado, mostrar el botón de "Iniciar sesión"
  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-green-500 flex-1">
        Inicia Sesión para Pagar
      </Button>
    );
  }

  // Si la autenticación está en proceso, el usuario está cargando, o el estado del checkout está cargando, mostrar un botón de carga
  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  // Si todo está listo, mostrar el formulario de usuario dentro de un diálogo para confirmar detalles de entrega
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-green-500 flex-1">
          Ir al Pago
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser} // Pasa los datos del usuario actual
          onSave={onCheckout} // Función que se llama al guardar el formulario
          isLoading={isGetUserLoading} // Indicador de carga de los datos del usuario
          title="Confirma los Detalles de Entrega" // Título del formulario
          buttonText="Continua con el pago!" // Texto del botón de confirmación
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
