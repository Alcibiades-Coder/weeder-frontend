// Importación de dependencias necesarias para la autenticación y navegación
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

// Tipo de las props para el componente, que espera un único hijo (children)
type Props = {
  children: React.ReactNode;
};

// Componente que envuelve el Auth0Provider y maneja la navegación post-autenticación
const Auth0ProviderWithNavigate = ({ children }: Props) => {
  // Hook para navegar a diferentes rutas
  const navigate = useNavigate();

  // Obtener las variables de entorno necesarias para configurar Auth0
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  // Verificar si todas las variables de entorno necesarias están disponibles
  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("unable to initialise auth"); // Lanzar error si alguna variable falta
  }

  // Función que maneja la redirección después de un inicio de sesión exitoso
  const onRedirectCallback = (appState?: AppState) => {
    // Redirigir al usuario a la página de retorno o a la ruta por defecto "/auth-callback"
    navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    // Proveedor de Auth0 que gestiona la autenticación en la aplicación
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri, // URI de redirección después de la autenticación
        audience, // Audiencia de la API que se autoriza
      }}
      onRedirectCallback={onRedirectCallback} // Callback para redirigir después del login
    >
      {children} {/* Renderizar los hijos dentro del Auth0Provider */}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
