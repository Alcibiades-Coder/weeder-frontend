// Importar los componentes necesarios de react-router-dom y otros componentes
import { Navigate, Route, Routes } from "react-router-dom"; // Componentes para manejar rutas y navegación
import Layout from "./layouts/layout"; // Componente que define la estructura base de la página
import HomePage from "./pages/HomePage"; // Página principal
import AuthCallbackPage from "./pages/AuthCallbackPage"; // Página de callback de autenticación
import UserProfilePage from "./pages/UserProfilePage"; // Página del perfil de usuario
import ProtectedRoute from "./auth/ProtectedRoute"; // Componente para proteger rutas de usuario autenticado
import ManageRestaurantPage from "./pages/ManageRestaurantPage"; // Página para gestionar restaurantes
import SearchPage from "./pages/SearchPage"; // Página de búsqueda de restaurantes
import DetailPage from "./pages/DetailPage"; // Página de detalles del restaurante
import OrderStatusPage from "./pages/OrderStatusPage"; // Página para ver el estado del pedido

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta para la página principal */}
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />

      {/* Ruta para la página de callback de autenticación */}
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      {/* Ruta para la página de búsqueda de restaurantes en una ciudad específica */}
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />

      {/* Ruta para la página de detalles de un restaurante */}
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />

      {/* Rutas protegidas, solo accesibles si el usuario está autenticado */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
      </Route>

      {/* Ruta para manejar rutas no encontradas, redirige a la página principal */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

// Exportar el componente AppRoutes
export default AppRoutes;
