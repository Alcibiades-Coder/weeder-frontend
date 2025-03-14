import { useAuth0 } from "@auth0/auth0-react"; // Importa el hook de autenticación de Auth0
import { Button } from "./ui/button"; // Importa el componente de botón personalizado
import UsernameMenu from "./UsernameMenu"; // Importa el componente que muestra el menú de usuario
import { Link } from "react-router-dom"; // Importa el componente Link de React Router para la navegación

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0(); // Obtiene las funciones de autenticación de Auth0

  return (
    <span className="flex space-x-2 items-center">
      {/* Si el usuario está autenticado, muestra enlaces y el menú de usuario */}
      {isAuthenticated ? (
        <>
          {/* Enlace a la página de estado de pedidos */}
          <Link to="/order-status" className="font-bold hover:text-green-500">
            Estado de Pedidos
          </Link>
          {/* Muestra el menú de usuario si está autenticado */}
          <UsernameMenu />
        </>
      ) : (
        // Si no está autenticado, muestra el botón de inicio de sesión
        <Button
          variant="ghost"
          className="font-bold hover:text-green-500 hover:bg-white"
          onClick={async () => await loginWithRedirect()} // Redirige al usuario a la página de inicio de sesión
        >
          Inicio de Sesión
        </Button>
      )}
    </span>
  );
};

export default MainNav;
