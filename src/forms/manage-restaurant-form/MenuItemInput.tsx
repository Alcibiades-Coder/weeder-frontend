// Importación de los componentes necesarios
import { Button } from "@/components/ui/button"; // Componente de botón
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Componentes para manejar el formulario y sus elementos
import { Input } from "@/components/ui/input"; // Componente de entrada de texto (input)
import { useFormContext } from "react-hook-form"; // Hook para gestionar el contexto del formulario

// Definición de las propiedades que espera el componente
type Props = {
  index: number; // Índice del item del menú en el arreglo
  removeMenuItem: () => void; // Función para eliminar el item del menú
};

// Componente que maneja la entrada de un item del menú (nombre y precio)
const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  // Obtención del control del formulario desde el contexto de react-hook-form
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      {/* Campo para el nombre del item del menú */}
      <FormField
        control={control} // Vincula el campo con el control del formulario
        name={`menuItems.${index}.name`} // El nombre del campo con índice dinámico
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Nombre <FormMessage />{" "}
              {/* Etiqueta para el campo con mensaje de error */}
            </FormLabel>
            <FormControl>
              {/* Campo de entrada para el nombre del item */}
              <Input
                {...field} // Se pasan las propiedades del campo
                placeholder="Cheese Pizza" // Texto de ejemplo
                className="bg-white" // Clase de estilo
              />
            </FormControl>
          </FormItem>
        )}
      />
      {/* Campo para el precio del item del menú */}
      <FormField
        control={control} // Vincula el campo con el control del formulario
        name={`menuItems.${index}.price`} // El nombre del campo con índice dinámico
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Precio CLP$ (£) <FormMessage />{" "}
              {/* Etiqueta para el campo con mensaje de error */}
            </FormLabel>
            <FormControl>
              {/* Campo de entrada para el precio del item */}
              <Input {...field} placeholder="8.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      {/* Botón para eliminar el item del menú */}
      <Button
        type="button" // Especifica que este botón no enviará el formulario
        onClick={removeMenuItem} // Llama a la función para eliminar el item del menú
        className="bg-red-500 max-h-fit" // Estilo del botón, color rojo de fondo
      >
        Remove {/* Texto del botón */}
      </Button>
    </div>
  );
};

export default MenuItemInput;
