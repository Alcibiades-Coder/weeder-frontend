// Importación de configuraciones y dependencias necesarias
import { cuisineList } from "@/config/restaurant-options-config"; // Lista de cocinas disponibles
import { Label } from "./ui/label"; // Componente Label para el texto
import { Check, ChevronDown, ChevronUp } from "lucide-react"; // Iconos de verificación y flechas
import { ChangeEvent } from "react"; // Tipo de evento para cambios en los formularios
import { Button } from "./ui/button"; // Componente Button para los botones

// Definición de las propiedades que recibirá el componente
type Props = {
  onChange: (cuisines: string[]) => void; // Función que se ejecuta al cambiar las cocinas seleccionadas
  selectedCuisines: string[]; // Lista de cocinas seleccionadas
  isExpanded: boolean; // Estado que indica si el filtro de cocinas está expandido
  onExpandedClick: () => void; // Función que se ejecuta al hacer clic para expandir o contraer el filtro
};

// Componente que maneja el filtro de cocinas
const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  // Función que maneja los cambios de selección de las cocinas (checkbox)
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value; // Cocina seleccionada
    const isChecked = event.target.checked; // Estado del checkbox

    // Actualizar la lista de cocinas seleccionadas según si se ha marcado o desmarcado el checkbox
    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine] // Si se selecciona, agregar la cocina
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine); // Si se deselecciona, eliminarla

    // Llamar a la función onChange con la lista actualizada de cocinas seleccionadas
    onChange(newCuisinesList);
  };

  // Función para resetear los filtros y limpiar las cocinas seleccionadas
  const handleCuisinesReset = () => onChange([]);

  return (
    <>
      {/* Sección superior con el título y el enlace para resetear los filtros */}
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filtrar por Cocina</div>
        <div
          onClick={handleCuisinesReset} // Al hacer clic, resetea los filtros
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      {/* Lista de cocinas con los checkboxes */}
      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7) // Mostrar un número limitado de cocinas si no está expandido
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine); // Verificar si la cocina está seleccionada
            return (
              <div className="flex" key={cuisine}>
                <input
                  id={`cuisine_${cuisine}`} // ID único para cada input de checkbox
                  type="checkbox" // Tipo de input checkbox
                  className="hidden" // Ocultar el checkbox para personalizar el estilo
                  value={cuisine} // El valor asociado al checkbox
                  checked={isSelected} // Si está seleccionado, marcar el checkbox
                  onChange={handleCuisinesChange} // Manejar el cambio en la selección
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`} // Asociar el label con el checkbox correspondiente
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600" // Estilo cuando está seleccionado
                      : "border border-slate-300" // Estilo cuando no está seleccionado
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />} // Mostrar
                  un check si la cocina está seleccionada
                  {cuisine} // Mostrar el nombre de la cocina
                </Label>
              </div>
            );
          })}

        {/* Botón para expandir o contraer la lista de cocinas */}
        <Button
          onClick={onExpandedClick} // Ejecutar la función para expandir o contraer
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              Ver Menos <ChevronUp /> // Mostrar "Ver Menos" con un ícono de
              flecha hacia arriba
            </span>
          ) : (
            <span className="flex flex-row items-center">
              Ver Más <ChevronDown /> // Mostrar "Ver Más" con un ícono de
              flecha hacia abajo
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
