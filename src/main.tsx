// Importación de React y ReactDOM para el renderizado de la aplicación
import React from "react";
import ReactDOM from "react-dom/client";

// Importación de los estilos globales
import "./global.css";

// Importación de Router para la navegación y las rutas en la aplicación
import { BrowserRouter as Router } from "react-router-dom";

// Importación de las rutas definidas en la aplicación
import AppRoutes from "./AppRoutes";

// Importación de Auth0ProviderWithNavigate, que envuelve la aplicación para manejar la autenticación con Auth0
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";

// Importación de QueryClient y QueryClientProvider de react-query para la gestión de estado y las peticiones de datos
import { QueryClient, QueryClientProvider } from "react-query";

// Importación de Toaster de sonner para mostrar notificaciones de forma fácil
import { Toaster } from "sonner";

// Configuración del cliente de react-query con opciones predeterminadas
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Desactiva la revalidación de consultas cuando la ventana obtiene foco
    },
  },
});

// Renderizado de la aplicación en el contenedor con id "root"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Router maneja la navegación y las rutas de la aplicación */}
    <Router>
      {/* QueryClientProvider proporciona el cliente de react-query a la aplicación */}
      <QueryClientProvider client={queryClient}>
        {/* Auth0ProviderWithNavigate proporciona la funcionalidad de autenticación mediante Auth0 */}
        <Auth0ProviderWithNavigate>
          {/* AppRoutes maneja las rutas de la aplicación */}
          <AppRoutes />
          {/* Toaster muestra las notificaciones en la esquina superior derecha */}
          <Toaster visibleToasts={1} position="top-right" richColors />
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
