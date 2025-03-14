import { CircleUserRound } from "lucide-react"; // Importa el ícono de usuario de lucide-react
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"; // Importa los componentes de menú desplegable personalizados
import { useAuth0 } from "@auth0/auth0-react"; // Importa el hook useAuth0 para gestionar autenticación con Auth0
import { Link } from "react-router-dom"; // Importa el componente Link para navegar entre rutas
import { Separator } from "./ui/separator"; // Importa el separador visual
import { Button } from "./ui/button"; // Importa el componente Button

const UsernameMenu = () => {
  const { user, logout } = useAuth0(); // Desestructura los valores de usuario y logout desde useAuth0

  return (
    <DropdownMenu>
      {/* Disparador del menú desplegable, muestra el ícono de usuario y el correo del usuario */}
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-green-500 gap-2">
        <CircleUserRound className="text-green-500" /> {/* Ícono de usuario */}
        {user?.email} {/* Muestra el correo del usuario */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Opción de menú para administrar restaurantes */}
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="font-bold hover:text-green-500"
          >
            Administrar Restaurantes
          </Link>
        </DropdownMenuItem>
        {/* Opción de menú para ver perfil de usuario */}
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-green-500">
            Perfil de Usuario
          </Link>
        </DropdownMenuItem>
        <Separator /> {/* Separa las opciones de menú */}
        {/* Opción de menú para cerrar sesión */}
        <DropdownMenuItem>
          <Button
            onClick={() => logout()} // Llama a logout cuando el botón es presionado
            className="flex flex-1 font-bold bg-green-500"
          >
            Cerrar Sesión
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
