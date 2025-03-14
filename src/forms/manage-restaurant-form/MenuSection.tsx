// Importación de los componentes necesarios
import { Button } from "@/components/ui/button"; // Componente de botón
import { FormDescription, FormField, FormItem } from "@/components/ui/form"; // Componentes para manejar la estructura del formulario
import { useFieldArray, useFormContext } from "react-hook-form"; // Hooks para gestionar arrays de campos y el contexto del formulario
import MenuItemInput from "./MenuItemInput"; // Componente para manejar la entrada de un item del menú

// Componente que maneja la sección del menú
const MenuSection = () => {
  // Obtención del control del formulario desde el contexto de react-hook-form
  const { control } = useFormContext();

  // useFieldArray permite manejar campos dinámicos en arrays (en este caso, los items del menú)
  const { fields, append, remove } = useFieldArray({
    control, // Control del formulario
    name: "menuItems", // Nombre del campo de array que se va a gestionar (items del menú)
  });

  return (
    <div className="space-y-2">
      {/* Título y descripción de la sección del menú */}
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>
          Crea tu Menu y dale Nombre y Precio a cada Plato!
        </FormDescription>
      </div>

      {/* Formulario para los items del menú */}
      <FormField
        control={control} // Vincula el campo con el control del formulario
        name="menuItems" // Nombre del campo que contiene los items del menú
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {/* Renderiza cada item del menú usando el componente MenuItemInput */}
            {fields.map((_, index) => (
              <MenuItemInput
                key={index} // Es importante proporcionar una key única para cada componente renderizado dinámicamente
                index={index} // El índice del item en el array
                removeMenuItem={() => remove(index)} // Función para eliminar el item del menú
              />
            ))}
          </FormItem>
        )}
      />

      {/* Botón para agregar un nuevo plato al menú */}
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Agrega otro Plato al Menu
      </Button>
    </div>
  );
};

export default MenuSection;
