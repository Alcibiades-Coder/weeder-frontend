// Importación de componentes necesarios para manejar el formulario
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Componente Input para los campos de texto
import { useFormContext } from "react-hook-form"; // Para acceder al contexto del formulario

const DetailsSection = () => {
  // Obtenemos el control del formulario desde el contexto de react-hook-form
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      {/* Título y descripción de la sección */}
      <div>
        <h2 className="text-2xl font-bold">Detalles</h2>
        <FormDescription>
          Agrega información acerca del Restaurante
        </FormDescription>
      </div>

      {/* Campo para el nombre del restaurante */}
      <FormField
        control={control} // Se pasa el control del formulario
        name="restaurantName" // El nombre del campo para el nombre del restaurante
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              {/* Componente Input para el campo del nombre */}
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />{" "}
            {/* Mensaje de validación o error si es necesario */}
          </FormItem>
        )}
      />

      {/* Campos para la ciudad y el país */}
      <div className="flex gap-4">
        {/* Campo para la ciudad */}
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Ciudad</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo para el país */}
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>País</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Campo para el precio de envío */}
      <FormField
        control={control}
        name="deliveryPrice"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>Precio de Envio ($CLP)</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="1500" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Campo para el tiempo estimado de entrega */}
      <FormField
        control={control}
        name="estimatedDeliveryTime"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>Tiempo Estimado de Entrega (minutos)</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="30" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DetailsSection;
