import { Link } from "react-router-dom"; // Importa el componente Link de react-router-dom para navegar entre páginas

type Props = {
  total: number; // Total de restaurantes encontrados
  city: string; // Ciudad donde se encontraron los restaurantes
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      {/* Muestra el número total de restaurantes encontrados en la ciudad */}
      <span>
        {total} Restaurante Encontrado en {city}
        {/* Enlace para cambiar la ubicación, que redirige a la página principal */}
        <Link
          to="/" // Enlace que redirige a la página principal
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Cambiar Ubicación {/* Texto del enlace */}
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
