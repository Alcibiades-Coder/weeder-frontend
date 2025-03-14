import { Restaurant } from "@/types"; // Importa el tipo Restaurant desde los tipos definidos
import { Link } from "react-router-dom"; // Importa el componente Link de react-router-dom para navegar entre páginas
import { AspectRatio } from "./ui/aspect-ratio"; // Importa el componente AspectRatio para manejar la relación de aspecto de las imágenes
import { Banknote, Clock, Dot } from "lucide-react"; // Importa íconos específicos de lucide-react

type Props = {
  restaurant: Restaurant; // Recibe un objeto de tipo Restaurant como propiedad
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`} // Define el enlace a la página de detalle del restaurante
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group" // Clase para el estilo del contenedor usando Grid Layout
    >
      {/* Componente AspectRatio para asegurar que la imagen tenga una relación de aspecto específica */}
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl} // Ruta de la imagen del restaurante
          className="rounded-md w-full h-full object-cover" // Estilos para la imagen (bordes redondeados, tamaño completo y objeto cubriendo)
        />
      </AspectRatio>
      <div>
        {/* Título del restaurante con efecto hover */}
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName} {/* Muestra el nombre del restaurante */}
        </h3>
        {/* Contenido del card */}
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {/* Muestra las cocinas del restaurante, separadas por un ícono Dot */}
            {restaurant.cuisines.map((item, index) => (
              <span className="flex" key={index}>
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}{" "}
                {/* Muestra un punto entre las cocinas, excepto en el último */}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-col">
            {/* Información sobre el tiempo estimado de entrega */}
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" /> {/* Ícono de reloj */}
              {restaurant.estimatedDeliveryTime} mins{" "}
              {/* Muestra el tiempo estimado de entrega */}
            </div>
            {/* Información sobre el costo de los pedidos */}
            <div className="flex items-center gap-1">
              <Banknote /> {/* Ícono de billete */}
              Pedidos desde ${restaurant.deliveryPrice.toFixed(2)}{" "}
              {/* Muestra el costo mínimo de los pedidos */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
