// Importación de componentes necesarios para el formulario y lista de cocinas
import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form"; // Para acceder al contexto del formulario
import CuisineCheckbox from "./CuisineCheckbox"; // Componente que representa un checkbox de cocina

const CuisinesSection = () => {
  // Obtenemos el control del formulario desde el contexto de react-hook-form
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      {/* Título de la sección */}
      <div>
        <h2 className="text-2xl font-bold">Tipos de Cocinas</h2>
        {/* Descripción debajo del título */}
        <FormDescription>Elije los Tipos de Cocina que ofreces</FormDescription>
      </div>
      {/* Definimos el campo de formulario para las cocinas seleccionadas */}
      <FormField
        control={control} // Se pasa el control del formulario
        name="cuisines" // Nombre del campo que contendrá las cocinas seleccionadas
        render={({ field }) => (
          <FormItem>
            {/* Crear una cuadrícula de checkboxes para cada cocina */}
            <div className="grid md:grid-cols-5 gap-1">
              {/* Iteramos sobre la lista de cocinas y generamos un checkbox por cada una */}
              {cuisineList.map((cuisineItem) => (
                <CuisineCheckbox cuisine={cuisineItem} field={field} />
              ))}
            </div>
            {/* Mensaje de validación o error si es necesario */}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
