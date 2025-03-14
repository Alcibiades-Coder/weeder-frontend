import { Restaurant } from "@/types"; // Importa el tipo de datos Restaurant desde el archivo de tipos
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"; // Importa los componentes relacionados con el Card desde la UI
import { Dot } from "lucide-react"; // Importa el ícono de punto (Dot) de lucide-react

type Props = {
  restaurant: Restaurant; // Tipo de datos que representa un restaurante
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    // Card que muestra la información del restaurante
    <Card className="border-sla">
      <CardHeader>
        {/* Título del restaurante */}
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        {/* Descripción del restaurante: Ciudad y País */}
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {/* Mapea las cocinas del restaurante y las muestra */}
        {restaurant.cuisines.map((item, index) => (
          <span className="flex">
            {/* Muestra cada tipo de cocina */}
            <span>{item}</span>
            {/* Si no es el último ítem, agrega un punto de separación entre las cocinas */}
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
