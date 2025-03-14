import type { MenuItem } from "../types"; // Importa el tipo MenuItem desde los tipos definidos
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"; // Importa componentes de UI personalizados para el diseño de tarjeta

type Props = {
  menuItem: MenuItem; // Define el tipo para el item del menú que se pasará como prop
  addToCart: () => void; // Define una función que se llama cuando el ítem se agrega al carrito
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    // Card: componente que representa un ítem del menú, con un manejador de click que agrega el ítem al carrito
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        {/* Título del ítem del menú */}
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        {/* Muestra el precio del ítem, formateado a dos decimales */}$
        {menuItem.price.toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
