import { Button } from "./ui/button"; // Importa el componente Button
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"; // Importa los componentes de menú desplegable

type Props = {
  onChange: (value: string) => void; // Función que maneja el cambio de opción de orden
  sortOption: string; // Opción de orden seleccionada
};

// Opciones disponibles para ordenar
const SORT_OPTIONS = [
  {
    label: "Mejor Resultado", // Etiqueta de la opción para mejor resultado
    value: "bestMatch", // Valor asociado a la opción
  },
  {
    label: "Precio de Envio", // Etiqueta de la opción para precio de envío
    value: "deliveryPrice", // Valor asociado a la opción
  },
  {
    label: "Tiempo Estimado de Entrega", // Etiqueta de la opción para tiempo estimado de entrega
    value: "estimatedDeliveryTime", // Valor asociado a la opción
  },
];

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
  // Encuentra la etiqueta de la opción seleccionada o usa la primera por defecto
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;

  return (
    <DropdownMenu>
      {/* Disparador del menú desplegable */}
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full">
          {/* Muestra la opción de orden seleccionada */}
          Ordenar por: {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Muestra las opciones de orden disponibles */}
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onChange(option.value)} // Llama a onChange con el valor de la opción seleccionada
          >
            {option.label} {/* Muestra la etiqueta de la opción */}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropdown;
