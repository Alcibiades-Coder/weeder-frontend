// Importar las imágenes y componentes necesarios
import landingImage from "../assets/landing.png"; // Imagen de bienvenida en la página principal
import appDownloadImage from "../assets/appDownload.png"; // Imagen de descarga de la app
import SearchBar, { SearchForm } from "@/components/SearchBar"; // Componente de barra de búsqueda y tipo SearchForm
import { useNavigate } from "react-router-dom"; // Hook para navegar entre páginas

const HomePage = () => {
  // Inicializar el hook para la navegación
  const navigate = useNavigate();

  // Función para manejar el envío del formulario de búsqueda
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    // Redirigir a la página de búsqueda con la consulta de búsqueda
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Sección de bienvenida con fondo blanco, sombra y estilo centrado */}
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        {/* Título principal de la página */}
        <h1 className="text-5xl font-bold tracking-tight text-green-600">
          Disfruta de un Bajón de otro Planeta!
        </h1>
        {/* Subtítulo que invita a realizar la acción */}
        <span className="text-xl">Acaba con el bajón con solo un Click!</span>
        {/* Barra de búsqueda con placeholder y manejador de envío */}
        <SearchBar
          placeHolder="Busca por Ciudad!"
          onSubmit={handleSearchSubmit} // Se pasa la función de manejo de búsqueda
        />
      </div>
      {/* Sección de imagen y promoción de la app */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Imagen de bienvenida o landing page */}
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {/* Título de la sección con mensaje promocional */}
          <span className="font-bold text-3xl tracking-tighter">
            Haz que tu pedido Vuele como tu!
          </span>
          {/* Descripción que invita a descargar la app */}
          <span>
            Descarga la App de Weeder para pedir con Recomendaciones
            Personalizadas!
          </span>
          {/* Imagen que promueve la descarga de la app */}
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

// Exportar el componente HomePage
export default HomePage;
