import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    // Contenedor principal del header con borde inferior verde y padding en el eje Y
    <div className="border-b-2 border-b-green-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Enlace al inicio (home) de la página, con el nombre del sitio en verde */}
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-green-500"
        >
          Weeder.com
        </Link>

        {/* Componente de navegación móvil que se muestra solo en pantallas pequeñas */}
        <div className="md:hidden">
          <MobileNav />
        </div>

        {/* Componente de navegación principal que se muestra solo en pantallas medianas y grandes */}
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
