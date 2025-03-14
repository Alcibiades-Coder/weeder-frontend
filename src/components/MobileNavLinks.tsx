import { Link } from "react-router-dom"; // Importa el componente Link para navegación entre páginas
import { Button } from "./ui/button"; // Componente UI de botón personalizado
import { useAuth0 } from "@auth0/auth0-react"; // Hook para la autenticación con Auth0

const MobileNavLinks = () => {
  // Se extrae la función de cierre de sesión (logout) desde Auth0
  const { logout } = useAuth0();

  return (
    <>
      {/* Enlace a la página de estado de pedidos */}
      <Link
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-green-500"
      >
        Estado de Pedidos
      </Link>

      {/* Enlace a la página de gestión de restaurantes */}
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold hover:text-green-500"
      >
        Mis Restaurantes
      </Link>

      {/* Enlace a la página de perfil de usuario */}
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-green-500"
      >
        Perfil de Usuario
      </Link>

      {/* Botón para cerrar sesión, ejecuta la función logout de Auth0 */}
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Cerrar Sesión
      </Button>
    </>
  );
};

export default MobileNavLinks;
