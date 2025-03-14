// Importación de hooks y librerías necesarias para la autenticación y la creación del usuario
import { useCreateMyUser } from "@/api/MyUserApi"; // Hook personalizado para crear un usuario en la base de datos
import { useAuth0 } from "@auth0/auth0-react"; // Hook de Auth0 para gestionar la autenticación
import { useEffect, useRef } from "react"; // useEffect para ejecutar efectos secundarios y useRef para referencias persistentes
import { useNavigate } from "react-router-dom"; // Hook para la navegación entre rutas

const AuthCallbackPage = () => {
  // hook 'useNavigate' para redirigir al usuario a otra página después del callback
  const navigate = useNavigate();

  // Obtenemos los detalles del usuario autenticado desde Auth0
  const { user } = useAuth0();

  // Usamos el hook 'useCreateMyUser' para acceder a la función que creará el usuario en nuestra base de datos
  const { createUser } = useCreateMyUser();

  // Referencia mutable para asegurarnos de que el usuario solo se cree una vez
  const hasCreatedUser = useRef(false);

  // Efecto que se ejecuta cuando el usuario se autentica correctamente
  useEffect(() => {
    // Comprobamos si el usuario tiene un 'sub' (ID de Auth0) y un 'email'
    // También verificamos que no se haya creado el usuario previamente
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      // Si todo está bien, llamamos a la función para crear el usuario en la base de datos
      createUser({ auth0Id: user.sub, email: user.email });

      // Marcamos que el usuario ya ha sido creado para evitar llamadas repetidas
      hasCreatedUser.current = true;
    }
    // Redirigimos al usuario a la página principal después de la autenticación
    navigate("/");
  }, [createUser, navigate, user]); // Dependencias: se ejecuta cuando 'createUser', 'navigate' o 'user' cambian

  return <>Cargando...</>; // Mensaje simple mientras se maneja el proceso de autenticación
};

export default AuthCallbackPage;
