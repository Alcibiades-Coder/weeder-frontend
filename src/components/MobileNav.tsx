import { CircleUserRound, Menu } from "lucide-react"; // Iconos de lucide-react: uno para usuario y otro para el menú
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"; // Componentes UI personalizados para crear un panel deslizante (Sheet)
import { Separator } from "./ui/separator"; // Componente UI para separar secciones
import { Button } from "./ui/button"; // Componente UI de botón
import { useAuth0 } from "@auth0/auth0-react"; // Hook para la autenticación con Auth0
import MobileNavLinks from "./MobileNavLinks"; // Componente que contiene los enlaces de navegación móvil

const MobileNav = () => {
  // Obtención de datos de autenticación desde Auth0
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    // Sheet: un contenedor deslizante para el menú móvil
    <Sheet>
      <SheetTrigger>
        {/* Icono del menú que activa el panel deslizante */}
        <Menu className="text-green-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {/* Si el usuario está autenticado, muestra su correo */}
          {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              {/* Icono de usuario con el correo del usuario */}
              <CircleUserRound className="text-green-500" />
              {user?.email}
            </span>
          ) : (
            // Si no está autenticado, muestra un mensaje de bienvenida
            <span> Bienvenido a Weeder.com!</span>
          )}
        </SheetTitle>
        <Separator /> {/* Sección separada con una línea */}
        <SheetDescription className="flex flex-col gap-4">
          {/* Si el usuario está autenticado, muestra los enlaces de navegación */}
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            // Si el usuario no está autenticado, muestra un botón para iniciar sesión
            <Button
              onClick={() => loginWithRedirect()}
              className="flex-1 font-bold bg-green-500"
            >
              Inicio de Sesión
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
