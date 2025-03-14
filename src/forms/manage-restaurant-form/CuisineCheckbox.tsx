// Importación de componentes UI y tipos necesarios para el formulario
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

// Definición de las propiedades esperadas en este componente
type Props = {
  cuisine: string; // Nombre de la cocina que se está seleccionando (Ej. "Italiana")
  field: ControllerRenderProps<FieldValues, "cuisines">; // Propiedades del campo para el control del formulario
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      {/* Componente de control de formulario que maneja el estado del checkbox */}
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)} // Verifica si la cocina está seleccionada
          onCheckedChange={(checked) => {
            // Si el checkbox se marca, agregamos la cocina al valor del campo
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              // Si el checkbox se desmarca, eliminamos la cocina del valor del campo
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              );
            }
          }}
        />
      </FormControl>
      {/* Etiqueta para mostrar el nombre de la cocina */}
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
