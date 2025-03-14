// Importación de dependencias necesarias para la autenticación con Auth0 y navegación
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

// Componente que protege las rutas que requieren autenticación
const ProtectedRoute = () => {
  // Obtener el estado de autenticación y carga de Auth0
  const { isAuthenticated, isLoading } = useAuth0();

  // Si la información de autenticación aún está cargando, no renderizar nada
  if (isLoading) {
    return null;
  }

  // Si el usuario está autenticado, renderiza el contenido de la ruta protegida
  if (isAuthenticated) {
    return <Outlet />;
  }

  // Si el usuario no está autenticado, redirige a la página de inicio
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
