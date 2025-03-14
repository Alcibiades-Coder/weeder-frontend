// Importación de componentes necesarios para gestionar la sección de imagen
import { AspectRatio } from "@/components/ui/aspect-ratio"; // Componente que mantiene la relación de aspecto de las imágenes
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"; // Componentes de formulario para crear un formulario limpio
import { Input } from "@/components/ui/input"; // Componente Input para gestionar los campos de entrada
import { useFormContext } from "react-hook-form"; // Para acceder al control del formulario

const ImageSection = () => {
  // Obtenemos el control y el valor actual de "imageUrl" desde el formulario
  const { control, watch } = useFormContext();

  // Obtenemos la URL de la imagen ya existente en el formulario
  const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-2">
      {/* Título y descripción de la sección */}
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Agrega una Imagen que se mostrara en los resultados de busqueda de
          Restaurantes. Agregar una nueva imagen sobreescribe la anterior.
        </FormDescription>
      </div>

      <div className="flex flex-col gap-8 md:w-[50%]">
        {/* Si ya existe una URL de imagen, mostramos una vista previa de la imagen */}
        {existingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            {/* Se establece la imagen con un aspecto de 16:9 */}
            <img
              src={existingImageUrl}
              className="rounded-md object-cover h-full w-full" // Estilos para ajustar la imagen
            />
          </AspectRatio>
        )}
        {/* Campo para seleccionar una nueva imagen */}
        <FormField
          control={control} // Pasamos el control del formulario
          name="imageFile" // El nombre del campo es "imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* Componente Input para aceptar un archivo de imagen */}
                <Input
                  className="bg-white"
                  type="file" // Tipo de entrada es "file" para seleccionar archivos
                  accept=".jpg, .jpeg, .png" // Solo aceptamos imágenes con estas extensiones
                  onChange={(event) =>
                    // Cuando se selecciona un archivo, se actualiza el valor del campo con el archivo seleccionado
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                />
              </FormControl>
              <FormMessage />{" "}
              {/* Se muestra cualquier mensaje de error o validación */}
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
